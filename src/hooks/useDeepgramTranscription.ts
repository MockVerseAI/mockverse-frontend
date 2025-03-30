import { checkAudioSupport, createOptimalRecorder } from "@/lib/utils/audio";
import { DeepgramTranscriptionResult } from "@/types/deepgram";
import { createClient, LiveClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseDeepgramTranscriptionReturn {
  transcript: string;
  resetTranscript: () => void;
  isSupported: boolean;
  startListening: (apiKey: string) => Promise<void>;
  stopListening: () => void;
  isListening: boolean;
  error: string | null;
}

interface UseDeepgramTranscriptionProps {
  onUtteranceEnd?: (transcript: string) => void;
}

export function useDeepgramTranscription({
  onUtteranceEnd,
}: UseDeepgramTranscriptionProps = {}): UseDeepgramTranscriptionReturn {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  // References to maintain state between renders
  const deepgramRef = useRef<LiveClient | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const accumulatedTranscriptRef = useRef<string>("");
  const interimTranscriptRef = useRef<string>("");

  // Check if browser supports required APIs
  useEffect(() => {
    const { isSupported, reasons } = checkAudioSupport();
    setIsSupported(isSupported);

    if (!isSupported) {
      setError(`Speech recognition not supported: ${reasons.join(", ")}`);
    }
  }, []);

  // Function to reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript("");
    accumulatedTranscriptRef.current = "";
    interimTranscriptRef.current = "";
  }, []);

  // Function to stop listening
  const stopListening = useCallback(() => {
    if (deepgramRef.current) {
      deepgramRef.current.requestClose();
      deepgramRef.current = null;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsListening(false);
  }, []);

  // Function to start listening
  const startListening = useCallback(
    async (apiKey: string) => {
      if (!isSupported) {
        setError("Your browser does not support the required APIs for transcription.");
        return;
      }

      // Check if API key is provided
      if (!apiKey) {
        setError("Deepgram API key is required for transcription.");
        return;
      }

      // Prevent multiple connections
      if (isListening || deepgramRef.current) {
        console.log("Connection already exists, stopping previous connection first");
        return;
      }

      try {
        resetTranscript();

        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;

        // Create Deepgram client
        const deepgram = createClient(apiKey);

        // Create a live transcription with proper configuration
        const connection = deepgram.listen.live({
          model: "nova-3",
          smart_format: true,
          punctuate: true,
          interim_results: true,
          vad_events: true,
          utterance_end_ms: 3000,
          vad_turnoff: 500,
        });

        // Handle connection open
        connection.on(LiveTranscriptionEvents.Open, () => {
          console.log("Connection opened");

          // Create a MediaRecorder with optimal settings
          const mediaRecorder = createOptimalRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          // Send audio data to Deepgram
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              connection.send(event.data);
            }
          };

          // Start recording - collect data every 100ms for more responsive results
          mediaRecorder.start(100);
          setIsListening(true);
        });

        // Handle transcription results
        connection.on(LiveTranscriptionEvents.Transcript, (data: DeepgramTranscriptionResult) => {
          // Check if we have transcript data
          if (data.channel?.alternatives?.[0]) {
            const alternative = data.channel.alternatives[0];
            const transcription = alternative.transcript.trim();

            if (transcription) {
              // Handle transcript updates
              if (data.is_final) {
                // This is a final result, so add it to our accumulated transcript
                accumulatedTranscriptRef.current += (accumulatedTranscriptRef.current ? " " : "") + transcription;
                interimTranscriptRef.current = "";
                setTranscript(accumulatedTranscriptRef.current);
              } else {
                // This is an interim result (not final)
                interimTranscriptRef.current = transcription;
                setTranscript(
                  accumulatedTranscriptRef.current +
                    (accumulatedTranscriptRef.current ? " " : "") +
                    interimTranscriptRef.current
                );
              }
            }
          }
        });

        // Handle utterance end event
        connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
          console.log("Utterance end detected by Deepgram");
          if (onUtteranceEnd) {
            console.log("Utterance end funtion by hook");
            onUtteranceEnd(accumulatedTranscriptRef.current);
          }
        });

        // Handle errors
        connection.on(LiveTranscriptionEvents.Error, (error) => {
          console.error("Deepgram error:", error);
          setError("Transcription error occurred");
          stopListening();
        });

        // Handle connection close
        connection.on(LiveTranscriptionEvents.Close, () => {
          console.log("Connection closed");
          stopListening();
        });

        deepgramRef.current = connection;
      } catch (err) {
        console.error("Error starting Deepgram transcription:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        stopListening();
      }
    },
    [isSupported, isListening, resetTranscript, onUtteranceEnd, stopListening]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    transcript,
    resetTranscript,
    isSupported,
    startListening,
    stopListening,
    isListening,
    error,
  };
}

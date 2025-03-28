import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, MicOff, PhoneOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface Message {
  type: string;
  transcriptType?: "final" | "partial";
  transcript?: string;
  role: "user" | "system" | "assistant";
}

// Helper hook for managing media streams
const useMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<{
    audio: "pending" | "granted" | "denied";
    video: "pending" | "granted" | "denied";
  }>({
    audio: "pending",
    video: "pending",
  });

  // Initialize media stream
  const initializeStream = async () => {
    try {
      // Request both audio and video permissions at once
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      setStream(mediaStream);
      setIsCameraEnabled(true);
      setIsMicEnabled(true);
      setPermissionStatus({
        audio: "granted",
        video: "granted",
      });

      return mediaStream;
    } catch (error) {
      console.error("Media permission error:", error);

      // Try to get audio only if video fails
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        setStream(audioOnlyStream);
        setIsCameraEnabled(false);
        setIsMicEnabled(true);
        setPermissionStatus({
          audio: "granted",
          video: "denied",
        });
        return audioOnlyStream;
      } catch (audioError) {
        console.error("Audio permission error:", audioError);
        setPermissionStatus({
          audio: "denied",
          video: "denied",
        });
        return null;
      }
    }
  };

  // Toggle camera without recreating the entire stream
  const toggleCamera = async () => {
    if (!stream) return;

    if (isCameraEnabled) {
      // Properly stop and remove video tracks
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      setIsCameraEnabled(false);
    } else {
      // Check permissions first
      try {
        const permissionResult = await navigator.permissions.query({ name: "camera" as PermissionName });
        if (permissionResult.state === "granted") {
          // Add new video tracks if permission is granted
          await addVideoTracksToStream();
        } else {
          console.error("Camera permission not granted");
          // Could add UI notification here
        }
      } catch (error) {
        console.error("Error checking camera permission:", error);
        // Fallback to direct attempt
        await addVideoTracksToStream();
      }
    }
  };

  // Helper function to add video tracks to stream
  const addVideoTracksToStream = async () => {
    if (!stream) return;

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });

      // Get just the video tracks from new stream
      const newVideoTracks = newStream.getVideoTracks();

      // Add video tracks to existing stream
      newVideoTracks.forEach((track) => {
        stream.addTrack(track);
      });

      // Stop all other tracks in the temporary stream to release resources
      newStream.getTracks().forEach((track) => {
        if (!newVideoTracks.includes(track)) {
          track.stop();
        }
      });

      setIsCameraEnabled(true);
    } catch (error) {
      console.error("Error adding video track:", error);
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    if (!stream) return;

    try {
      // Toggle tracks enabled state
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        // Simply toggle enabled state for audio tracks
        audioTracks.forEach((track) => {
          track.enabled = !isMicEnabled;
        });
      }

      // Also use vapi's native muting functionality
      try {
        vapi.setMuted(!isMicEnabled);
      } catch (error) {
        console.error("Error toggling Vapi mute:", error);
      }

      setIsMicEnabled(!isMicEnabled);
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  };

  // Clean up function
  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  return {
    stream,
    isCameraEnabled,
    isMicEnabled,
    permissionStatus,
    initializeStream,
    toggleCamera,
    toggleMic,
    cleanup,
  };
};

const ConsentScreen = ({ onStart }: { onStart: (videoStream: MediaStream) => void }) => {
  const { stream, isCameraEnabled, isMicEnabled, permissionStatus, initializeStream } = useMediaStream();

  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const userName = "Guest User";

  // Set up video preview when stream is available
  useEffect(() => {
    if (stream && videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream, isCameraEnabled]);

  // Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  // Request permissions
  const requestPermissions = async () => {
    try {
      const mediaStream = await initializeStream();
      if (!mediaStream) {
        console.error("Failed to get media stream");
        // Could add a UI toast notification here
      }
    } catch (error) {
      console.error("Error requesting permissions:", error);
      // Could add a UI toast notification here
    }
  };

  const handleStartInterview = () => {
    if (stream) {
      onStart(stream);
    }
  };

  const canProceed = stream && permissionStatus.audio === "granted" && permissionStatus.video === "granted";

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-semibold text-transparent">
            Vapi
          </span>
          <span className="text-xl font-semibold">Meet</span>
        </div>
        <div className="text-sm">{userName}</div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl grow flex-col items-center justify-center p-6">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left side - Video Preview */}
          <div className="col-span-3 overflow-hidden rounded-lg shadow-lg">
            {stream ? (
              <div className="relative h-[450px] w-full">
                {isCameraEnabled ? (
                  <video ref={videoPreviewRef} className="h-full w-full object-cover" autoPlay muted playsInline />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className="mb-4 text-5xl">
                      {userName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                    <div className="text-lg">Camera is off</div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 font-medium text-white">
                  {userName}
                  {!isMicEnabled && <MicOff className="ml-2 inline-block h-4 w-4 text-red-500" />}
                </div>
              </div>
            ) : (
              <div className="flex h-[450px] w-full flex-col items-center justify-center bg-gray-900 text-white">
                <div className="mb-4 text-5xl">
                  {userName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
                <div className="text-lg">Camera and microphone permissions required</div>
                {permissionStatus.video !== "granted" || permissionStatus.audio !== "granted" ? (
                  <Button onClick={requestPermissions} className="mt-6 bg-blue-600 hover:bg-blue-700" size="lg">
                    Allow Camera & Microphone
                  </Button>
                ) : null}
              </div>
            )}
          </div>

          {/* Right side - Controls */}
          <div className="col-span-2 flex flex-col justify-between">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">AI Interview</h1>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Scheduled for</span>
                <span className="font-semibold">Today</span>
              </div>

              {stream ? (
                <div className="space-y-6 pt-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Before starting:</p>
                    <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                      <li>Ensure you are in a quiet environment</li>
                      <li>Check that your face is clearly visible</li>
                      <li>Have your resume or notes nearby if needed</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-amber-50 p-4 text-sm text-amber-800">
                  <p className="font-medium">Camera and microphone access needed</p>
                  <p className="mt-1">You must allow access to continue with the interview</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Button
                size="lg"
                onClick={handleStartInterview}
                disabled={!canProceed}
                className="w-full bg-blue-600 py-6 text-base hover:bg-blue-700"
              >
                Join Interview
              </Button>
              {!canProceed && (
                <p className="mt-2 text-center text-sm text-red-500">Camera and microphone access required to join</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InterviewScreen = ({ videoStream }: { videoStream: MediaStream }) => {
  // State management
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.CONNECTING);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [agentVolumeLevel, setAgentVolumeLevel] = useState<number>(0);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const userName = "Guest User";
  const aiName = "AI Assistant";

  // Initialize video
  useEffect(() => {
    if (videoStream && userVideoRef.current) {
      userVideoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  // Start the interview automatically
  useEffect(() => {
    let isComponentMounted = true;

    const startInterview = async () => {
      if (!videoStream) return;

      try {
        // Register event listeners first
        setupVapiEventListeners();

        // Then start the call
        await vapi.start(import.meta.env.VITE_INTERVIEW_ID);
      } catch (error) {
        console.error("Failed to start interview:", error);
        if (isComponentMounted) {
          setCallStatus(CallStatus.FINISHED);
        }
      }
    };

    startInterview();

    return () => {
      isComponentMounted = false;

      // Clean up when component unmounts
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }

      // Remove event listeners
      removeVapiEventListeners();

      // Stop the call
      try {
        vapi.stop();
      } catch (error) {
        console.error("Error stopping Vapi:", error);
      }
    };
  }, [videoStream]);

  // Separate function to set up event listeners
  const setupVapiEventListeners = () => {
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("volume-level", onVolumeLevel);
    vapi.on("error", onError);
  };

  // Separate function to remove event listeners
  const removeVapiEventListeners = () => {
    vapi.off("call-start", onCallStart);
    vapi.off("call-end", onCallEnd);
    vapi.off("message", onMessage);
    vapi.off("speech-start", onSpeechStart);
    vapi.off("speech-end", onSpeechEnd);
    vapi.off("volume-level", onVolumeLevel);
    vapi.off("error", onError);
  };

  const onCallStart = () => {
    setCallStatus(CallStatus.ACTIVE);
  };

  const onCallEnd = () => {
    setCallStatus(CallStatus.FINISHED);
  };

  const onMessage = (message: Message) => {
    if (message.type === "transcript" && message.transcriptType === "final" && message.transcript) {
      const newMessage = { role: message.role, content: message.transcript };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const onSpeechStart = () => {
    setIsSpeaking(true);
  };

  const onSpeechEnd = () => {
    setIsSpeaking(false);
  };

  const onError = (error: Error) => {
    console.log("Error:", error);
    // Could add a UI toast notification here
  };

  const onVolumeLevel = (level: number) => {
    setAgentVolumeLevel(level);
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      setLastMessage(lastMsg.content);
    }
  }, [messages]);

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case CallStatus.ACTIVE:
        return "bg-green-500";
      case CallStatus.CONNECTING:
        return "bg-yellow-500";
      case CallStatus.FINISHED:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-center bg-gray-100 py-2">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${getStatusColor()}`}></span>
          <span className="text-sm font-medium">{callStatus}</span>
        </div>
      </div>

      {/* Main content - Video Grid */}
      <main className="relative flex grow items-center justify-center px-4">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
          {/* User video tile */}
          <Card className="relative aspect-video overflow-hidden">
            <video ref={userVideoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
            <div className="absolute bottom-3 left-3 font-medium text-white">{userName}</div>
          </Card>

          {/* AI video tile */}
          <Card className="relative aspect-video overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="relative">
                {isSpeaking && (
                  <>
                    {/* Outer pulse animation */}
                    <motion.div
                      className="bg-primary/20 absolute -inset-8 rounded-full"
                      animate={{
                        scale: [1, 1 + agentVolumeLevel * 0.8, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Inner pulse animation */}
                    <motion.div
                      className="bg-primary/30 absolute -inset-4 rounded-full"
                      animate={{
                        scale: [1, 1 + agentVolumeLevel * 0.5, 1],
                        opacity: [0.5, 0.3, 0.5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}
                <Avatar className="h-24 w-24">
                  <AvatarFallback
                    className={`bg-primary text-5xl ${isSpeaking ? "animate-pulse" : ""}`}
                    style={{
                      animation: isSpeaking ? `pulse ${0.6 - agentVolumeLevel * 0.3}s infinite` : "none",
                    }}
                  >
                    A
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 font-medium text-white">
              {aiName}
              {isSpeaking && <span className="ml-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-green-500"></span>}
            </div>
          </Card>
        </div>

        {/* Last message transcript overlay (optional) */}
        {lastMessage && (
          <div className="absolute right-0 bottom-24 left-0 flex justify-center">
            <div className="max-w-2xl rounded-lg bg-black/60 px-4 py-2 text-white">
              <p className="text-center">{lastMessage}</p>
            </div>
          </div>
        )}
      </main>

      {/* Controls */}
      <div className="flex justify-center py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDisconnect}
            className="h-12 w-12 rounded-full"
            aria-label="End call"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const AudioMeetingApp = () => {
  const [userVideoStream, setUserVideoStream] = useState<MediaStream | null>(null);
  const [showConsentScreen, setShowConsentScreen] = useState(true);

  const handleStartInterview = (videoStream: MediaStream) => {
    setUserVideoStream(videoStream);
    setShowConsentScreen(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (userVideoStream) {
        userVideoStream.getTracks().forEach((track) => {
          track.stop();
        });

        // Also stop Vapi if active
        if (!showConsentScreen) {
          vapi.stop();
        }
      }
    };
  }, [userVideoStream, showConsentScreen]);

  return (
    <>
      {showConsentScreen ? (
        <ConsentScreen onStart={handleStartInterview} />
      ) : (
        <InterviewScreen videoStream={userVideoStream!} />
      )}
    </>
  );
};

export default AudioMeetingApp;

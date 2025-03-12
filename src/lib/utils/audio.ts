/**
 * Helper utilities for audio processing and Deepgram integration
 */

/**
 * Converts audio data to the format expected by Deepgram
 * @param audioData The audio data to convert
 * @returns Audio data in the correct format for Deepgram
 */
export const formatAudioForDeepgram = (audioData: Blob): Blob => {
  // Deepgram's WebSocket API can handle common formats directly
  // The most important thing is to ensure the MediaRecorder is
  // configured with a format that provides high-quality audio
  return audioData;
};

/**
 * Creates a MediaRecorder with the optimal settings for Deepgram
 * @param stream The media stream to record
 * @returns A configured MediaRecorder instance
 */
export const createOptimalRecorder = (stream: MediaStream): MediaRecorder => {
  // Try to use high-quality audio formats for better transcription

  // Check if the browser can provide higher audio quality settings
  if (stream.getAudioTracks().length > 0) {
    const audioTrack = stream.getAudioTracks()[0];

    try {
      // Try to set constraints for better audio quality
      // This doesn't work on all browsers but can improve quality when supported
      audioTrack
        .applyConstraints({
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000, // Higher sample rate for better quality
          channelCount: 1, // Mono is often better for speech recognition
        })
        .catch((e) => console.warn("Could not apply advanced audio constraints:", e));
    } catch (e) {
      console.warn("Advanced audio constraints not supported by this browser", e);
    }
  }

  // Find the best supported recording format
  const options: MediaRecorderOptions = {
    mimeType: "audio/webm",
  };

  // Try to use the best audio format that's supported
  // Order matters here - try high-quality formats first
  const supportedMimeTypes = [
    "audio/webm;codecs=opus", // Opus codec provides excellent speech quality
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/ogg",
    "audio/mp4",
    "audio/wav",
    "audio/aac",
  ];

  for (const mimeType of supportedMimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      options.mimeType = mimeType;
      console.log(`Using audio format: ${mimeType}`);
      break;
    }
  }

  // Create the recorder with best possible quality
  // High audioBitsPerSecond can improve transcription quality
  if (options.mimeType?.includes("opus")) {
    return new MediaRecorder(stream, {
      ...options,
      audioBitsPerSecond: 128000, // 128kbps for good speech quality
    });
  }

  return new MediaRecorder(stream, options);
};

/**
 * Checks if the browser supports the necessary APIs for audio transcription
 * @returns An object indicating support status and any reasons for lack of support
 */
export const checkAudioSupport = (): {
  isSupported: boolean;
  reasons: string[];
} => {
  const reasons: string[] = [];

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    reasons.push("MediaDevices API is not supported");
  }

  if (typeof MediaRecorder === "undefined") {
    reasons.push("MediaRecorder API is not supported");
  }

  if (typeof WebSocket === "undefined") {
    reasons.push("WebSocket API is not supported");
  }

  if (typeof window.AudioContext === "undefined" && typeof (window as any).webkitAudioContext === "undefined") {
    reasons.push("AudioContext API is not supported");
  }

  // Check for secure context - microphone access requires HTTPS or localhost
  if (window.isSecureContext === false) {
    reasons.push("Not running in a secure context (HTTPS or localhost)");
  }

  return {
    isSupported: reasons.length === 0,
    reasons,
  };
};

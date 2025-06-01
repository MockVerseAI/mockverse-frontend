import { useCallback, useRef, useState, useEffect } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface DualAudioWaveformProps {
  userAudioUrl: string;
  assistantAudioUrl: string;
  combinedAudioUrl: string;
  title?: string;
  className?: string;
  height?: number;
}

const DualAudioWaveform: React.FC<DualAudioWaveformProps> = ({
  userAudioUrl,
  assistantAudioUrl,
  combinedAudioUrl,
  title = "Recording",
  className = "",
  height = 80,
}) => {
  const userContainerRef = useRef<HTMLDivElement>(null);
  const assistantContainerRef = useRef<HTMLDivElement>(null);
  const combinedContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // User waveform
  const { wavesurfer: userWavesurfer } = useWavesurfer({
    container: userContainerRef,
    url: userAudioUrl,
    waveColor: "#4ade80",
    progressColor: "#f59e0b",
    height,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    normalize: true,
    cursorColor: "transparent",
    backend: "WebAudio",
  });

  // Assistant waveform
  const { wavesurfer: assistantWavesurfer } = useWavesurfer({
    container: assistantContainerRef,
    url: assistantAudioUrl,
    waveColor: "#4ade80",
    progressColor: "#f59e0b",
    height,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    normalize: true,
    cursorColor: "transparent",
    backend: "WebAudio",
  });

  // Combined waveform (hidden, used for playback control)
  const { wavesurfer: combinedWavesurfer, isReady: combinedReady } = useWavesurfer({
    container: combinedContainerRef,
    url: combinedAudioUrl,
    waveColor: "#4ade80",
    progressColor: "#f59e0b",
    height: 0, // Hidden
    normalize: true,
    backend: "WebAudio",
  });

  const getActiveWavesurfer = useCallback(() => {
    return combinedWavesurfer;
  }, [combinedWavesurfer]);

  const handlePlayPause = useCallback(() => {
    const wavesurfer = getActiveWavesurfer();
    if (!wavesurfer) return;

    if (isPlaying) {
      // Pause all
      userWavesurfer?.pause();
      assistantWavesurfer?.pause();
      combinedWavesurfer?.pause();
    } else {
      wavesurfer.play();
    }
  }, [getActiveWavesurfer, isPlaying, userWavesurfer, assistantWavesurfer, combinedWavesurfer]);

  const handleSpeedChange = useCallback(() => {
    const newRate = playbackRate === 1.0 ? 1.5 : playbackRate === 1.5 ? 2.0 : 1.0;
    setPlaybackRate(newRate);

    // Apply to all waveforms
    userWavesurfer?.setPlaybackRate(newRate);
    assistantWavesurfer?.setPlaybackRate(newRate);
    combinedWavesurfer?.setPlaybackRate(newRate);
  }, [playbackRate, userWavesurfer, assistantWavesurfer, combinedWavesurfer]);

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const syncWaveforms = useCallback(
    (currentTime: number, totalDuration: number) => {
      if (!userWavesurfer || !assistantWavesurfer) return;

      const progress = currentTime / totalDuration;
      userWavesurfer.seekTo(progress);
      assistantWavesurfer.seekTo(progress);
    },
    [userWavesurfer, assistantWavesurfer]
  );

  useEffect(() => {
    const activeWavesurfer = getActiveWavesurfer();
    if (!activeWavesurfer) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = (time: number) => {
      setCurrentTime(time);
      syncWaveforms(time, activeWavesurfer.getDuration());
    };

    activeWavesurfer.on("play", handlePlay);
    activeWavesurfer.on("pause", handlePause);
    activeWavesurfer.on("timeupdate", handleTimeUpdate);

    return () => {
      activeWavesurfer.un("play", handlePlay);
      activeWavesurfer.un("pause", handlePause);
      activeWavesurfer.un("timeupdate", handleTimeUpdate);
    };
  }, [getActiveWavesurfer, syncWaveforms]);

  const isReady = combinedReady;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${className}`}>
          {/* Waveforms Container */}
          <div className="mb-4 flex items-center justify-between">
            <Button
              onClick={handlePlayPause}
              disabled={!isReady}
              aria-label={isPlaying ? "Pause" : "Play"}
              tabIndex={0}
              size="icon"
            >
              {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
            </Button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSpeedChange}
                className="rounded bg-gray-700 px-2 py-1 text-sm text-white transition-colors hover:bg-gray-600"
                aria-label={`Playback speed: ${playbackRate}x`}
              >
                {playbackRate}x
              </button>
              <div className="font-mono text-lg text-white">{formatTime(currentTime)}</div>
            </div>
          </div>

          <div className="relative mb-4 overflow-hidden rounded-lg">
            {/* User Waveform */}
            <div className="border-b border-gray-600 px-4 py-2">
              <div className="mb-1 text-xs text-gray-400">User</div>
              <div ref={userContainerRef} className="w-full" style={{ minHeight: height }} />
            </div>

            {/* Assistant Waveform */}
            <div className="px-4 py-2">
              <div className="mb-1 text-xs text-gray-400">Assistant</div>
              <div ref={assistantContainerRef} className="w-full" style={{ minHeight: height }} />
            </div>

            {/* Hidden Combined Waveform for Control */}
            <div ref={combinedContainerRef} className="hidden" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DualAudioWaveform;

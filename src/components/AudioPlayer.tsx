"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Radio, Sparkles } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  episodeNumber: number;
  duration: string;
  guest?: string;
}

export function AudioPlayer({
  title,
  episodeNumber,
  duration,
  guest,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(2520);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalSeconds]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleSpeedToggle = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const bars = [20, 45, 65, 30, 85, 50, 95, 70, 40, 80, 60, 35, 90, 45, 25, 75, 55, 30, 85, 40];

  return (
    <div
      className="bg-[#121314] text-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-[#3E3832] shadow-2xl relative overflow-hidden"
      role="region"
      aria-label={`Audio Player: Episode ${episodeNumber}`}
    >
      {/* 3D Atmospheric Radial Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#A85B32]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Broadcast Deck Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#3E3832] relative z-10">
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-widest uppercase bg-[#A85B32]/20 text-[#A85B32] border border-[#A85B32]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85B32] mr-1.5 animate-pulse" />
              ON AIR · Episode {episodeNumber}
            </span>
            <span className="text-xs font-mono text-[#E8E4DC]/60">{duration}</span>
          </div>
          <h4 className="font-serif text-xl sm:text-2xl text-[#FAF9F6] leading-snug">
            {title}
          </h4>
          {guest && (
            <p className="font-sans text-xs sm:text-sm text-[#E8E4DC]/70 mt-1">
              Featuring <strong className="text-[#FAF9F6] font-medium">{guest}</strong>
            </p>
          )}
        </div>

        {/* Speed Switcher */}
        <div className="flex items-center space-x-3 self-start sm:self-center">
          <button
            type="button"
            onClick={handleSpeedToggle}
            className="px-3 py-1 rounded-full border border-white/15 text-xs font-mono text-[#E8E4DC]/80 hover:border-[#A85B32] hover:text-[#A85B32] transition-colors duration-200 active:scale-95"
            aria-label={`Playback speed: ${playbackSpeed}x`}
          >
            {playbackSpeed}x Speed
          </button>
        </div>
      </div>

      {/* Waveform & Scrubber */}
      <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center space-x-1.5 h-10 py-1" aria-hidden="true">
          {bars.map((height, i) => (
            <span
              key={i}
              className={`w-1 bg-[#A85B32] rounded-full transition-all duration-300 ${
                isPlaying ? "opacity-90" : "opacity-35"
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (height * (Math.sin(i + currentTime * 2) + 1.2)) / 2)}%` : `${height}%`,
              }}
            />
          ))}
        </div>

        <div className="flex-1 sm:max-w-xs space-y-1">
          <input
            type="range"
            min="0"
            max={totalSeconds}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#A85B32]"
            aria-label="Seek through audio episode"
          />
          <div className="flex justify-between text-xs font-mono text-[#E8E4DC]/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Control Console */}
      <div className="pt-4 border-t border-[#3E3832] flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={togglePlay}
            className="px-5 py-2.5 rounded-full bg-[#A85B32] hover:bg-[#8F4822] text-[#FFFFFF] font-sans text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 transition-colors duration-200 shadow-md active:scale-95"
            aria-label={isPlaying ? "Pause episode" : "Play episode"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Conversation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentTime(0)}
            className="p-2 text-[#E8E4DC]/60 hover:text-[#FAF9F6] transition-colors duration-200 rounded-full hover:bg-white/5 active:scale-95"
            aria-label="Restart audio from beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-[#E8E4DC]/60 font-mono">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-[#E8E4DC]/60 hover:text-[#FAF9F6] transition-colors duration-200"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#A85B32]" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <span className="hidden md:inline">Studio Feed</span>
        </div>
      </div>
    </div>
  );
}

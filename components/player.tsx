"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { formatClock } from "@/lib/format";

export function Player({ title, src }: { title: string; src: string | null }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  function onTimeUpdate() {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    setRemaining(audio.duration - audio.currentTime);
    setProgress(audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0);
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    void audio.play();
    setPlaying(true);
  }

  return (
    <div className="player desktop-only">
      <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
        {playing ? (
          <span className="stop-icon">
            <Image src="/ui/rectangle-1.png" alt="" width={8} height={50} />
            <Image src="/ui/rectangle-2.png" alt="" width={8} height={50} />
          </span>
        ) : (
          <Image src="/ui/paly.png" alt="" width={30} height={50} />
        )}
      </button>
      <p className="name bold">{title}</p>
      {remaining !== null ? <p className="time bold">{formatClock(remaining)}</p> : null}
      <div className="progress" style={{ width: `${progress}%` }} />
      {src ? (
        <audio ref={audioRef} preload="none" src={src} onTimeUpdate={onTimeUpdate} onEnded={() => setPlaying(false)} />
      ) : null}
    </div>
  );
}

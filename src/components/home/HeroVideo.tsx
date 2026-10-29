"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Starts after the page has loaded and the browser is idle; skipped on data-saver, slow networks and reduced motion. The
 * hero photo underneath stands in until it plays (and instead of it), so the video needs no poster of its own.
 */
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || connection?.saveData || /2g$/.test(connection?.effectiveType ?? "")) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      video.src = src;
      video.play().catch(() => undefined);
    };
    // Safari has no requestIdleCallback.
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(start, { timeout: 4000 });
      else timeoutId = setTimeout(start, 2000);
    };
    if (document.readyState === "complete") schedule();
    else addEventListener("load", schedule, { once: true });

    const io = new IntersectionObserver(([entry]) => {
      if (!video.currentSrc) return;
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    });
    io.observe(video);

    return () => {
      removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      io.disconnect();
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className="hero-video"
      data-playing={playing}
      onPlaying={() => setPlaying(true)}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

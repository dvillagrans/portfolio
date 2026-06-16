"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { CaseStudyMedia } from "@/data/case-study-media";

export type CaseStudyMediaPlayback = "lazy" | "active-scene" | "static-image";
export type CaseStudyMediaLayout = "standalone" | "embedded";

interface CaseStudyHeroMediaProps {
  media: CaseStudyMedia;
  layout?: CaseStudyMediaLayout;
  playback?: CaseStudyMediaPlayback;
  isActive?: boolean;
  reducedMotion?: boolean;
  showControls?: boolean;
  sizes?: string;
  priority?: boolean;
  imageStyle?: CSSProperties;
  className?: string;
}

const aspectClass: Record<NonNullable<CaseStudyMedia["aspectRatio"]>, string> = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
};

const defaultStandaloneFrame =
  "relative overflow-hidden rounded-2xl border border-offwhite/10 bg-offwhite/[0.02]";

function safePlay(video: HTMLVideoElement) {
  const result = video.play();
  if (result && typeof result.catch === "function") {
    void result.catch(() => {});
  }
}

export function CaseStudyHeroMedia({
  media,
  layout = "standalone",
  playback = "lazy",
  isActive = true,
  reducedMotion = false,
  showControls = true,
  sizes = "(max-width: 1024px) 100vw, 896px",
  priority = false,
  imageStyle,
  className,
}: CaseStudyHeroMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lazyReady, setLazyReady] = useState(false);
  const [sceneVideoMounted, setSceneVideoMounted] = useState(false);

  const aspect = media.aspectRatio ?? "16/10";
  const frameClass = aspectClass[aspect];
  const canUseVideo = Boolean(media.video) && !reducedMotion;

  useEffect(() => {
    if (!canUseVideo || playback !== "lazy") return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLazyReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canUseVideo, playback]);

  useEffect(() => {
    if (!canUseVideo || playback !== "active-scene") return;
    if (isActive) setSceneVideoMounted(true);
  }, [canUseVideo, playback, isActive]);

  const videoEnabled =
    canUseVideo &&
    (playback === "lazy"
      ? lazyReady
      : playback === "active-scene"
        ? sceneVideoMounted && isActive
        : false);

  const showPoster =
    !canUseVideo ||
    playback === "static-image" ||
    (playback === "lazy" && !lazyReady) ||
    (playback === "active-scene" && !videoEnabled);

  useEffect(() => {
    if (!canUseVideo || playback !== "active-scene") return;

    const video = videoRef.current;
    if (!video || !sceneVideoMounted) return;

    if (isActive) {
      safePlay(video);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [canUseVideo, playback, isActive, sceneVideoMounted]);

  useEffect(() => {
    if (!videoEnabled || !videoRef.current || playback === "active-scene") return;
    safePlay(videoRef.current);
  }, [videoEnabled, playback]);

  const image = (
    <Image
      src={media.poster}
      alt={media.alt}
      fill
      className="object-cover object-top"
      sizes={sizes}
      priority={priority}
      style={imageStyle}
    />
  );

  const video =
    canUseVideo && media.video ? (
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-top"
        poster={media.poster}
        preload={playback === "active-scene" ? "none" : "metadata"}
        playsInline
        muted
        loop
        controls={showControls}
        aria-label={media.alt}
      >
        {media.video.webm ? <source src={media.video.webm} type="video/webm" /> : null}
        <source src={media.video.mp4} type="video/mp4" />
      </video>
    ) : null;

  const inner = (
    <>
      {showPoster ? image : null}
      {videoEnabled ? video : null}
    </>
  );

  if (layout === "embedded") {
    return <div className="absolute inset-0">{inner}</div>;
  }

  return (
    <div ref={containerRef} className={`${frameClass} ${defaultStandaloneFrame} ${className ?? ""}`}>
      {inner}
    </div>
  );
}

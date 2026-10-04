"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FRAME_CONFIG,
  getFrameUrl,
  progressToFrameIndex,
  computeCoverFit,
} from "@/lib/frame-utils";

interface FrameSequenceProps {
  /** Callback for debug UI updates */
  onFrameUpdate?: (currentFrame: number, targetFrame: number, progress: number) => void;
}

export default function FrameSequence({
  onFrameUpdate,
}: FrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // In-memory image cache: frameNumber -> HTMLImageElement
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // Track in-flight image requests to prevent duplicate network calls
  const loadingQueueRef = useRef<Set<number>>(new Set());

  // Animation and scroll interpolation tracking
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // Ready state when first frame is loaded
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  /**
   * Helper to find the nearest cached frame if target frame isn't loaded yet.
   * This guarantees zero blank screens or flashing during rapid scrolling.
   */
  const getNearestLoadedFrame = useCallback((targetFrame: number): HTMLImageElement | null => {
    const cache = imageCacheRef.current;
    if (cache.has(targetFrame)) {
      return cache.get(targetFrame)!;
    }

    // Search outward (1 frame ahead/behind, 2 ahead/behind, etc.)
    for (let offset = 1; offset < FRAME_CONFIG.totalFrames; offset++) {
      const lower = targetFrame - offset;
      const higher = targetFrame + offset;

      if (lower >= FRAME_CONFIG.startIndex && cache.has(lower)) {
        return cache.get(lower)!;
      }
      if (higher <= FRAME_CONFIG.endIndex && cache.has(higher)) {
        return cache.get(higher)!;
      }
    }
    return null;
  }, []);

  /**
   * Draws a specific frame image onto the canvas, respecting DPR and cover aspect ratio.
   */
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear previous frame
    ctx.clearRect(0, 0, width, height);

    // Calculate dimensions for cover fit
    const { dx, dy, dWidth, dHeight } = computeCoverFit(
      width,
      height,
      img.naturalWidth || FRAME_CONFIG.nativeWidth,
      img.naturalHeight || FRAME_CONFIG.nativeHeight
    );

    ctx.drawImage(img, dx, dy, dWidth, dHeight);
  }, []);

  /**
   * Loads a single frame image asynchronously and stores it in cache.
   */
  const loadFrame = useCallback((frameNumber: number, onLoaded?: (img: HTMLImageElement) => void) => {
    if (frameNumber < FRAME_CONFIG.startIndex || frameNumber > FRAME_CONFIG.endIndex) return;

    if (imageCacheRef.current.has(frameNumber)) {
      if (onLoaded) onLoaded(imageCacheRef.current.get(frameNumber)!);
      return;
    }

    if (loadingQueueRef.current.has(frameNumber)) return;

    loadingQueueRef.current.add(frameNumber);

    const img = new Image();
    img.src = getFrameUrl(frameNumber);
    img.onload = () => {
      imageCacheRef.current.set(frameNumber, img);
      loadingQueueRef.current.delete(frameNumber);
      if (onLoaded) onLoaded(img);
    };
    img.onerror = () => {
      loadingQueueRef.current.delete(frameNumber);
    };
  }, []);

  /**
   * Progressive preloading: prioritize frames in proximity to the user's current scroll position.
   */
  const preloadSurroundingFrames = useCallback((centerFrame: number) => {
    // Preload immediate window (e.g. +/- 25 frames forward/backward)
    const windowSize = 25;
    const start = Math.max(FRAME_CONFIG.startIndex, centerFrame - windowSize);
    const end = Math.min(FRAME_CONFIG.endIndex, centerFrame + windowSize);

    // Load next frames first, then previous frames
    for (let i = centerFrame; i <= end; i++) {
      loadFrame(i);
    }
    for (let i = centerFrame - 1; i >= start; i--) {
      loadFrame(i);
    }
  }, [loadFrame]);

  /**
   * Resizes canvas buffer dimensions matching window viewport multiplied by devicePixelRatio.
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Clamped to 2 for performance
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set display size (CSS pixels)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set actual resolution (DPI-scaled buffer)
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Redraw the current frame immediately
    const currentImg = getNearestLoadedFrame(Math.round(currentFrameRef.current));
    if (currentImg) {
      drawImageToCanvas(currentImg);
    }
  }, [drawImageToCanvas, getNearestLoadedFrame]);

  /**
   * Continuous animation loop with LERP smoothing for fluid frame transitions.
   */
  const startAnimationLoop = useCallback(() => {
    const update = () => {
      if (prefersReducedMotionRef.current) {
        // Reduced motion: no interpolation, render first frame or target directly
        const target = targetFrameRef.current;
        const img = getNearestLoadedFrame(target);
        if (img && target !== lastDrawnFrameRef.current) {
          drawImageToCanvas(img);
          lastDrawnFrameRef.current = target;
        }
        rafIdRef.current = requestAnimationFrame(update);
        return;
      }

      // Smooth interpolation between current and target frame (LERP factor 0.15)
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.15;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.round(currentFrameRef.current);

      if (frameToDraw !== lastDrawnFrameRef.current) {
        const img = getNearestLoadedFrame(frameToDraw);
        if (img) {
          drawImageToCanvas(img);
          lastDrawnFrameRef.current = frameToDraw;
        }
      }

      // Trigger preloading around current playback position
      preloadSurroundingFrames(frameToDraw);

      // Report update for optional debug info
      if (onFrameUpdate) {
        const progress = (frameToDraw - 1) / (FRAME_CONFIG.totalFrames - 1);
        onFrameUpdate(frameToDraw, targetFrameRef.current, progress);
      }

      rafIdRef.current = requestAnimationFrame(update);
    };

    rafIdRef.current = requestAnimationFrame(update);
  }, [drawImageToCanvas, getNearestLoadedFrame, onFrameUpdate, preloadSurroundingFrames]);

  /**
   * Scroll event handler: updates targetFrameRef based on scroll depth in hero section.
   * Measures against the enclosing hero section element to track the full scroll duration.
   */
  const handleScroll = useCallback(() => {
    const heroSection = containerRef.current?.closest("section") || containerRef.current;
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance <= 0) {
      targetFrameRef.current = 1;
      return;
    }

    // rect.top is 0 at start, and -scrollableDistance at end of hero
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    const target = progressToFrameIndex(progress);
    targetFrameRef.current = target;
  }, []);

  useEffect(() => {
    // 1. Reduced motion detection
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // 2. Initialize canvas size
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // 3. Set up passive scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 4. Priority: Load first frame immediately and render
    loadFrame(FRAME_CONFIG.startIndex, (firstImg) => {
      setIsFirstFrameLoaded(true);
      drawImageToCanvas(firstImg);
      lastDrawnFrameRef.current = 1;

      // 5. Preload first chunk of initial frames
      preloadSurroundingFrames(1);

      // 6. Start the render loop
      startAnimationLoop();
    });

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [drawImageToCanvas, handleResize, handleScroll, loadFrame, preloadSurroundingFrames, startAnimationLoop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Canvas Viewport */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full bg-black"
      />

      {/* Loading fallback overlay before frame 1 renders */}
      {!isFirstFrameLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white/50 text-sm font-mono tracking-widest">
          INITIALIZING CINEMATIC SEQUENCE...
        </div>
      )}
    </div>
  );
}

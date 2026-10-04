"use client";

import { useState, useEffect, useCallback } from "react";
import { FRAME_CONFIG, progressToFrameIndex } from "./frame-utils";
import {
  CINEMATIC_SCENES,
  SceneName,
  sceneEnvelopeOpacity,
  progressToSceneName,
} from "./cinematic-scenes";

export interface FrameProgressState {
  /** Current interpolated frame number [1, 1215] */
  frame: number;
  /** Global scroll progress [0, 1] */
  progress: number;
  /** Active cinematic scene name */
  scene: SceneName;
  /** Opacity envelope [0,1] for the opening sign decoration layer */
  openingOpacity: number;
  /** Opacity envelope [0,1] for the flower decoration layer */
  flowerOpacity: number;
  /** Opacity envelope [0,1] for the lantern decoration layer */
  lanternOpacity: number;
}

/**
 * Subscribes to global window scroll and returns live cinematic frame progress.
 * This is a lightweight read-only hook — it does NOT drive the canvas (that remains
 * fully owned by CinematicBackground). It simply mirrors the same scroll calculation
 * so overlay components can synchronise their decorations.
 *
 * Uses requestAnimationFrame throttling to stay cheap.
 */
export function useFrameProgress(): FrameProgressState {
  const [state, setState] = useState<FrameProgressState>({
    frame: 1,
    progress: 0,
    scene: "opening",
    openingOpacity: 0,
    flowerOpacity: 0,
    lanternOpacity: 0,
  });

  const compute = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const totalDocHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(1, totalDocHeight - viewportHeight);

    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    const frame = progressToFrameIndex(progress);
    const scene = progressToSceneName(progress);

    const openingOpacity = sceneEnvelopeOpacity(frame, CINEMATIC_SCENES.opening, 12);
    const flowerOpacity  = sceneEnvelopeOpacity(frame, CINEMATIC_SCENES.flower, 30);
    // Use the precise lanternSky window (frames 515–1038) so PNG lanterns only appear
    // when the cinematic background genuinely shows the lantern night-sky environment.
    // 40-frame fade gives a smooth ~3-second in/out at typical scroll speed.
    const lanternOpacity = sceneEnvelopeOpacity(frame, CINEMATIC_SCENES.lanternSky, 40);

    setState({ frame, progress, scene, openingOpacity, flowerOpacity, lanternOpacity });
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          compute();
          ticking = false;
        });
      }
    };

    // Initial computation
    compute();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [compute]);

  return state;
}

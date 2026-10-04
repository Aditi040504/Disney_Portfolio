/**
 * Cinematic Scene Map — Derived from direct inspection of the 1,215-frame sequence.
 *
 * Scene ranges were identified by visually inspecting frames at key intervals:
 *
 * Frame   1 –  60 : OPENING    — Dark prologue, sun symbol, Rapunzel with the royal flag
 * Frame  60 – 150 : FLOWER     — Enchanted botanical world; floating flowers, deep blue atmosphere,
 *                                a hand holding flowers (the enchanted flower origin scene)
 * Frame 150 – 515 : TOWER      — Tower interior murals, King grieving, Rapunzel painting/spinning,
 *                                Rapunzel looking up at the night sky (pre-lantern)
 * Frame 515 –1038 : LANTERN_SKY — The actual night-sky lantern environment. Verified by frame
 *                                inspection: frame 515 = first lanterns visible; frame 1038 = last
 *                                fully compatible frame before castle-door / daylight cut at 1042.
 *                                Includes: castle lantern launch, ship scenes, boat duet, bokeh close-ups.
 * Frame 370 –1120 : LANTERN    — Broader scene boundary kept for scene-name routing only.
 *                                Use LANTERN_SKY for decoration visibility.
 * Frame 1038–1215 : ENDING     — Daylight castle / reunion / fade to black, cinematic close
 */

import { FRAME_CONFIG } from "./frame-utils";

export interface SceneRange {
  /** Human-readable scene name */
  name: string;
  /** Inclusive start frame (1-based) */
  start: number;
  /** Inclusive end frame (1-based) */
  end: number;
}

export const CINEMATIC_SCENES = {
  opening:    { name: "opening",     start: 1,    end: 60   } as SceneRange,
  flower:     { name: "flower",      start: 60,   end: 150  } as SceneRange,
  tower:      { name: "tower",       start: 150,  end: 515  } as SceneRange,
  lantern:    { name: "lantern",     start: 370,  end: 1120 } as SceneRange, // broad boundary for scene routing
  lanternSky: { name: "lanternSky",  start: 515,  end: 1038 } as SceneRange, // precise decoration window
  ending:     { name: "ending",      start: 1038, end: 1215 } as SceneRange,
} as const;

export type SceneName = keyof typeof CINEMATIC_SCENES;

/**
 * Returns a normalised [0, 1] progress value for how far the current frame
 * is through a given scene. Returns 0 before the scene starts, 1 after it ends.
 */
export function sceneProgress(currentFrame: number, scene: SceneRange): number {
  if (currentFrame <= scene.start) return 0;
  if (currentFrame >= scene.end) return 1;
  return (currentFrame - scene.start) / (scene.end - scene.start);
}

/**
 * Returns a "centre-weighted" opacity curve for a scene:
 *   - Fades in over the first `fadeFrames` frames of the scene
 *   - Holds at full opacity in the middle
 *   - Fades out over the last `fadeFrames` frames of the scene
 *
 * Useful for decorative overlay elements that should gradually appear/disappear
 * as the global frame sequence moves through a scene.
 */
export function sceneEnvelopeOpacity(
  currentFrame: number,
  scene: SceneRange,
  fadeFrames: number = 40
): number {
  const sceneLength = scene.end - scene.start;
  const framesIn = currentFrame - scene.start;

  if (framesIn <= 0 || currentFrame > scene.end) return 0;

  // Fade-in ramp
  if (framesIn < fadeFrames) {
    return framesIn / fadeFrames;
  }

  // Fade-out ramp
  const framesFromEnd = scene.end - currentFrame;
  if (framesFromEnd < fadeFrames) {
    return Math.max(0, framesFromEnd / fadeFrames);
  }

  // Full opacity in middle
  return 1;
}

/**
 * Converts a global scroll progress [0, 1] to an approximate frame number,
 * then returns the name of the cinematic scene active at that frame.
 */
export function progressToSceneName(progress: number): SceneName {
  const frame = 1 + Math.round(progress * (FRAME_CONFIG.totalFrames - 1));
  for (const [key, scene] of Object.entries(CINEMATIC_SCENES) as [SceneName, SceneRange][]) {
    if (frame >= scene.start && frame <= scene.end) return key;
  }
  return "ending";
}

/**
 * Global scroll progress thresholds for each scene boundary.
 * Useful for section placement decisions without importing frame logic.
 */
export const SCENE_PROGRESS = {
  openingStart:    0,
  openingEnd:      (CINEMATIC_SCENES.opening.end    - 1) / (FRAME_CONFIG.totalFrames - 1),
  flowerStart:     (CINEMATIC_SCENES.flower.start   - 1) / (FRAME_CONFIG.totalFrames - 1),
  flowerEnd:       (CINEMATIC_SCENES.flower.end     - 1) / (FRAME_CONFIG.totalFrames - 1),
  towerStart:      (CINEMATIC_SCENES.tower.start    - 1) / (FRAME_CONFIG.totalFrames - 1),
  towerEnd:        (CINEMATIC_SCENES.tower.end      - 1) / (FRAME_CONFIG.totalFrames - 1),
  lanternStart:    (CINEMATIC_SCENES.lantern.start  - 1) / (FRAME_CONFIG.totalFrames - 1),
  lanternEnd:      (CINEMATIC_SCENES.lantern.end    - 1) / (FRAME_CONFIG.totalFrames - 1),
  lanternSkyStart: (CINEMATIC_SCENES.lanternSky.start - 1) / (FRAME_CONFIG.totalFrames - 1),
  lanternSkyEnd:   (CINEMATIC_SCENES.lanternSky.end   - 1) / (FRAME_CONFIG.totalFrames - 1),
  endingStart:     (CINEMATIC_SCENES.ending.start   - 1) / (FRAME_CONFIG.totalFrames - 1),
  endingEnd:       1,
} as const;

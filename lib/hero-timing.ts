/**
 * Cinematic Intro Timing Map Configuration
 *
 * Sequence Breakdown (1,215 Frames Total):
 * - Frame 1 – 400: Atmospheric Opening / Character Movement
 * - Frame 400 – 750: Golden Scene Development / Lantern Atmosphere
 * - Frame 750 – 950: Identity Reveal Starts / Subtle Name Fade In
 * - Frame 950 – 1150: Designation & Subtitle Full Presentation
 * - Frame 1150 – 1215: Scene Settles & Cinematic Darkening Transition to Story
 */

export const HERO_TIMING_MAP = {
  totalFrames: 1215,
  introStartFrame: 1,
  characterMovementEndFrame: 450,
  identityRevealStartFrame: 700,
  nameFullRevealFrame: 880,
  designationRevealFrame: 980,
  fadeToStoryStartFrame: 1120,
  introEndFrame: 1215,
};

/**
 * Computes opacity values [0, 1] for name, role, and fade-to-story overlay
 * based on current interpolated frame index.
 */
export function computeHeroVisualState(currentFrame: number) {
  const {
    identityRevealStartFrame,
    nameFullRevealFrame,
    designationRevealFrame,
    fadeToStoryStartFrame,
    introEndFrame,
  } = HERO_TIMING_MAP;

  // Name opacity ramp
  let nameOpacity = 0;
  if (currentFrame >= identityRevealStartFrame) {
    nameOpacity = Math.min(
      1,
      (currentFrame - identityRevealStartFrame) / (nameFullRevealFrame - identityRevealStartFrame)
    );
  }

  // Designation / role opacity ramp
  let designationOpacity = 0;
  if (currentFrame >= nameFullRevealFrame) {
    designationOpacity = Math.min(
      1,
      (currentFrame - nameFullRevealFrame) / (designationRevealFrame - nameFullRevealFrame)
    );
  }

  // Gradual darkening & transition fade to story
  let transitionOverlayOpacity = 0;
  if (currentFrame >= fadeToStoryStartFrame) {
    transitionOverlayOpacity = Math.min(
      0.85,
      ((currentFrame - fadeToStoryStartFrame) / (introEndFrame - fadeToStoryStartFrame)) * 0.85
    );
  }

  return {
    nameOpacity,
    designationOpacity,
    transitionOverlayOpacity,
  };
}

/**
 * Frame Configuration & Utility Helpers
 *
 * Frame Details Discovered during project inspection:
 * - Total frames: 1,215
 * - Naming pattern: frame_0001.jpg -> frame_1215.jpg (4-digit zero-padded index)
 * - Dimensions: 1920x1080 (16:9 aspect ratio)
 * - File format: JPEG (.jpg)
 */

export const FRAME_CONFIG = {
  totalFrames: 1215,
  startIndex: 1,
  endIndex: 1215,
  aspectRatio: 1920 / 1080,
  nativeWidth: 1920,
  nativeHeight: 1080,
  prefix: "frame_",
  padLength: 4,
  extension: ".jpg",
};

/**
 * Returns the formatted filename for a given 1-based frame index.
 * Example: index 1 -> "frame_0001.jpg", index 1215 -> "frame_1215.jpg"
 */
export function getFrameFilename(frameNumber: number): string {
  const clampedNumber = Math.max(
    FRAME_CONFIG.startIndex,
    Math.min(FRAME_CONFIG.endIndex, Math.round(frameNumber))
  );
  const paddedIndex = String(clampedNumber).padStart(FRAME_CONFIG.padLength, "0");
  return `${FRAME_CONFIG.prefix}${paddedIndex}${FRAME_CONFIG.extension}`;
}

/**
 * Returns the URL endpoint for loading a specific frame.
 */
export function getFrameUrl(frameNumber: number): string {
  const filename = getFrameFilename(frameNumber);
  return `/api/frames/${filename}`;
}

/**
 * Converts a scroll progress value [0, 1] to a 1-based frame index [1, totalFrames].
 * Formula: frameIndex = 1 + Math.round(progress * (totalFrames - 1))
 */
export function progressToFrameIndex(progress: number): number {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  return 1 + Math.round(clampedProgress * (FRAME_CONFIG.totalFrames - 1));
}

/**
 * Converts a 1-based frame index back to scroll progress [0, 1].
 */
export function frameIndexToProgress(frameIndex: number): number {
  return (frameIndex - 1) / (FRAME_CONFIG.totalFrames - 1);
}

/**
 * Computes destination rectangle with "object-fit: cover" behavior.
 * Preserves source image aspect ratio without distortion and centers it within canvas.
 */
export function computeCoverFit(
  canvasWidth: number,
  canvasHeight: number,
  imageWidth: number,
  imageHeight: number
): { dx: number; dy: number; dWidth: number; dHeight: number } {
  const canvasRatio = canvasWidth / canvasHeight;
  const imageRatio = imageWidth / imageHeight;

  let dWidth: number;
  let dHeight: number;

  if (canvasRatio > imageRatio) {
    // Canvas is wider than image aspect ratio: scale to match canvas width
    dWidth = canvasWidth;
    dHeight = canvasWidth / imageRatio;
  } else {
    // Canvas is taller than image aspect ratio: scale to match canvas height
    dHeight = canvasHeight;
    dWidth = canvasHeight * imageRatio;
  }

  // Center the image in the canvas viewport
  const dx = (canvasWidth - dWidth) / 2;
  const dy = (canvasHeight - dHeight) / 2;

  return { dx, dy, dWidth, dHeight };
}

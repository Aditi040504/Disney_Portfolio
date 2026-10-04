## Botanical Flower Assets Required
## public/decorations/flowers/

These asset slots are prepared for the flower scene decoration system.
The system will display these images when the cinematic frame sequence enters
the enchanted flower scene (approximately frames 60–150).

Required assets:
- flower-01.png — White/cream daisy-type flower, transparent background, natural photo style
- flower-02.png — Soft yellow flower with visible natural petal detail, transparent background
- flower-03.png — Purple/violet small bloom, transparent background
- flower-04.png — Pink botanical flower (similar to those in Rapunzel's braided hair), transparent background
- flower-05.png — Loose petal(s) cluster, warm golden/orange tones, transparent background

Asset specifications:
- Format: PNG with genuine transparency, or WebP
- Style: Realistic botanical photography cutout — NOT AI-generated, NOT cartoon, NOT 3D render
- Lighting: Natural warm/golden side lighting preferred
- Minimum size: 400×400px
- No visible watermarks
- Visually compatible with the warm amber/purple cinematic palette of the sequence

The component (components/SceneDecorations.tsx) is fully wired and will
automatically use these files once they are placed here with these exact filenames.

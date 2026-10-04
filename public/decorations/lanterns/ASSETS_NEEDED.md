## Lantern Assets Required
## public/decorations/lanterns/

These asset slots are prepared for the lantern scene decoration system.
The system will display these images when the cinematic frame sequence enters
the lantern night sky scene (approximately frames 370–1120).

Required assets:
- lantern-large.png  — A single sky lantern (paper lantern), warm amber glow, translucent paper,
                       visible structure, realistic lighting, transparent background
- lantern-medium.png — Medium sky lantern, slightly cooler pinkish-orange tone, transparent background
- lantern-small.png  — Small/distant sky lantern, warm yellow-white, transparent background

Asset specifications:
- Format: PNG with genuine transparency, or WebP
- Style: Realistic paper lantern photography or highly realistic painted asset — NOT cartoon,
         NOT obviously AI-generated with plastic-looking glows
- Lighting: Warm inner glow, natural light falloff, slight translucency of the paper visible
- Minimum size: 300×400px
- No visible watermarks
- Visually compatible with the dark navy + warm amber palette of the lantern scene

The component (components/SceneDecorations.tsx) is fully wired and will
automatically use these files once they are placed here with these exact filenames.

In the absence of real assets, the system falls back to pure atmospheric
SVG glow orbs that match the lantern colour palette from the frames.
The fallback already provides a believable atmospheric effect.

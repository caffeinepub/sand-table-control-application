export interface SamplePattern {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
  gCode?: string;
}

export const samplePatterns: SamplePattern[] = [
  {
    id: 'spiral-1',
    name: 'Classic Spiral',
    thumbnail: '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 180,
    gCode: 'G0 X0 Y0\nG1 X10 Y10 F1000\nG1 X20 Y0 F1000\nG1 X0 Y-10 F1000',
  },
  {
    id: 'mandala-1',
    name: 'Mandala Flow',
    thumbnail: '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 300,
    gCode: 'G0 X0 Y0\nG2 X10 Y10 I5 J5 F800',
  },
  {
    id: 'wave-1',
    name: 'Ocean Waves',
    thumbnail: '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 240,
  },
  {
    id: 'geometric-1',
    name: 'Geometric Grid',
    thumbnail: '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 420,
  },
  {
    id: 'lotus-1',
    name: 'Lotus Flower',
    thumbnail: '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 360,
  },
  {
    id: 'zen-1',
    name: 'Zen Garden',
    thumbnail: '/assets/generated/empty-patterns.dim_1200x800.png',
    duration: 480,
  },
];

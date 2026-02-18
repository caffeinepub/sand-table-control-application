import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface ToolpathRendererProps {
  path: Point[];
  progress: number;
}

export default function ToolpathRenderer({ path, progress }: ToolpathRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || path.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw full path in light color
    ctx.strokeStyle = 'oklch(var(--muted-foreground) / 0.3)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Draw progress in primary color
    const progressIndex = Math.floor((progress / 100) * path.length);
    if (progressIndex > 0) {
      ctx.strokeStyle = 'oklch(var(--primary))';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i <= progressIndex && i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();

      // Draw current position
      if (progressIndex < path.length) {
        ctx.fillStyle = 'oklch(var(--primary))';
        ctx.beginPath();
        ctx.arc(path[progressIndex].x, path[progressIndex].y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [path, progress]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="w-full rounded-lg border border-border bg-background"
    />
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause } from 'lucide-react';

interface PlaybackScrubberProps {
  progress: number;
  onProgressChange: (progress: number) => void;
}

export default function PlaybackScrubber({ progress, onProgressChange }: PlaybackScrubberProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      onProgressChange(Math.min(progress + 1, 100));
      if (progress >= 100) {
        setIsPlaying(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, progress, onProgressChange]);

  return (
    <div className="flex items-center gap-3">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Slider
        value={[progress]}
        onValueChange={([v]) => {
          setIsPlaying(false);
          onProgressChange(v);
        }}
        max={100}
        step={1}
        className="flex-1"
      />
      <span className="text-sm text-muted-foreground w-12 text-right">
        {progress.toFixed(0)}%
      </span>
    </div>
  );
}

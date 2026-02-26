import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SpeedScaleControlsProps {
  speed: number;
  scale: number;
  onSpeedChange: (speed: number) => void;
  onScaleChange: (scale: number) => void;
}

export default function SpeedScaleControls({
  speed,
  scale,
  onSpeedChange,
  onScaleChange,
}: SpeedScaleControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adjustments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Speed</Label>
            <span className="text-sm text-muted-foreground">{speed}%</span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={([v]) => onSpeedChange(v)}
            min={10}
            max={200}
            step={10}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Scale</Label>
            <span className="text-sm text-muted-foreground">{scale}%</span>
          </div>
          <Slider
            value={[scale]}
            onValueChange={([v]) => onScaleChange(v)}
            min={50}
            max={150}
            step={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}

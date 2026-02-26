import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface BrightnessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function BrightnessSlider({ value, onChange }: BrightnessSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Brightness</Label>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );
}

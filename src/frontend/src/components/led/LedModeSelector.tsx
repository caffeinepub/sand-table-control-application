import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type LedMode = 'static' | 'breathing' | 'rainbow' | 'pattern-sync';

interface LedModeSelectorProps {
  value: LedMode;
  onChange: (mode: LedMode) => void;
}

export default function LedModeSelector({ value, onChange }: LedModeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Mode</Label>
      <Select value={value} onValueChange={(v) => onChange(v as LedMode)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="static">Static Color</SelectItem>
          <SelectItem value="breathing">Breathing</SelectItem>
          <SelectItem value="rainbow">Rainbow Cycle</SelectItem>
          <SelectItem value="pattern-sync">Pattern Synced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

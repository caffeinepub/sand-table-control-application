import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ColorPicker from './ColorPicker';
import BrightnessSlider from './BrightnessSlider';
import LedModeSelector, { type LedMode } from './LedModeSelector';
import { useCommandClient } from '@/hooks/useCommandClient';
import { toast } from 'sonner';

interface LedControlPanelProps {
  patternId?: string;
}

export default function LedControlPanel({ patternId }: LedControlPanelProps) {
  const [enabled, setEnabled] = useState(true);
  const [color, setColor] = useState('#ff6b35');
  const [brightness, setBrightness] = useState(100);
  const [mode, setMode] = useState<LedMode>('static');
  const { sendCommand, isConnected } = useCommandClient();

  useEffect(() => {
    if (!isConnected) return;
    
    const rgb = hexToRgb(color);
    const adjustedBrightness = Math.floor((brightness / 100) * 255);
    
    if (enabled) {
      sendCommand(`LED:${rgb.r},${rgb.g},${rgb.b},${adjustedBrightness},${mode}`)
        .catch((error) => toast.error('LED command failed: ' + error.message));
    } else {
      sendCommand('LED:0,0,0,0,static')
        .catch((error) => toast.error('LED command failed: ' + error.message));
    }
  }, [enabled, color, brightness, mode, isConnected, sendCommand]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>LED Control</CardTitle>
        <CardDescription>
          Control the RGB LED lighting for your sand table
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="led-enabled">LED Power</Label>
          <Switch
            id="led-enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
            disabled={!isConnected}
          />
        </div>

        {enabled && (
          <>
            <ColorPicker value={color} onChange={setColor} />
            <BrightnessSlider value={brightness} onChange={setBrightness} />
            <LedModeSelector value={mode} onChange={setMode} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

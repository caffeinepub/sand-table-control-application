import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Point {
  x: number;
  y: number;
}

interface PromptPatternGeneratorProps {
  onPathChange: (path: Point[]) => void;
}

export default function PromptPatternGenerator({ onPathChange }: PromptPatternGeneratorProps) {
  const [prompt, setPrompt] = useState('');

  const generatePattern = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    const lowerPrompt = prompt.toLowerCase();
    let path: Point[] = [];

    if (lowerPrompt.includes('spiral')) {
      // Generate spiral
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 8;
        const radius = (i / 100) * 150;
        path.push({
          x: 300 + Math.cos(angle) * radius,
          y: 200 + Math.sin(angle) * radius,
        });
      }
    } else if (lowerPrompt.includes('mandala') || lowerPrompt.includes('flower')) {
      // Generate mandala/flower
      for (let petal = 0; petal < 8; petal++) {
        const baseAngle = (petal / 8) * Math.PI * 2;
        for (let i = 0; i < 20; i++) {
          const t = i / 20;
          const angle = baseAngle + Math.sin(t * Math.PI) * 0.5;
          const radius = 80 + Math.sin(t * Math.PI) * 40;
          path.push({
            x: 300 + Math.cos(angle) * radius,
            y: 200 + Math.sin(angle) * radius,
          });
        }
      }
    } else if (lowerPrompt.includes('geometric')) {
      // Generate geometric pattern
      const size = 100;
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        path.push({
          x: 300 + Math.cos(angle) * size,
          y: 200 + Math.sin(angle) * size,
        });
      }
      path.push(path[0]);
    } else {
      // Default circle
      for (let i = 0; i <= 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        path.push({
          x: 300 + Math.cos(angle) * 100,
          y: 200 + Math.sin(angle) * 100,
        });
      }
    }

    onPathChange(path);
    toast.success('Pattern generated');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Prompt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe your pattern... (e.g., 'spiral', 'mandala', 'geometric')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <Button onClick={generatePattern} className="w-full gap-2">
          <Sparkles className="h-4 w-4" />
          Generate Pattern
        </Button>
      </CardContent>
    </Card>
  );
}

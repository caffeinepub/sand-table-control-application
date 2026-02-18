import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ToolpathRenderer from './ToolpathRenderer';
import PlaybackScrubber from './PlaybackScrubber';

interface Point {
  x: number;
  y: number;
}

interface PatternPreviewProps {
  path: Point[];
}

export default function PatternPreview({ path }: PatternPreviewProps) {
  const [progress, setProgress] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pattern Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToolpathRenderer path={path} progress={progress} />
        <PlaybackScrubber progress={progress} onProgressChange={setProgress} />
      </CardContent>
    </Card>
  );
}

import { useParams } from '@tanstack/react-router';
import { samplePatterns } from '@/data/samplePatterns';
import RunControls from '@/components/run/RunControls';
import PatternPreview from '@/components/preview/PatternPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function PatternRunPage() {
  const { patternId } = useParams({ from: '/pattern/$patternId' });
  const pattern = samplePatterns.find((p) => p.id === patternId);

  if (!pattern) {
    return (
      <div className="container max-w-4xl py-6">
        <p className="text-center text-muted-foreground">Pattern not found</p>
      </div>
    );
  }

  const dummyPath = Array.from({ length: 50 }, (_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    return {
      x: 300 + Math.cos(angle) * 100,
      y: 200 + Math.sin(angle) * 100,
    };
  });

  const minutes = Math.floor(pattern.duration / 60);
  const seconds = pattern.duration % 60;

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{pattern.name}</h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <Clock className="h-4 w-4" />
          <span>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pattern Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <RunControls patternId={patternId} />
        </CardContent>
      </Card>

      <PatternPreview path={dummyPath} />
    </div>
  );
}

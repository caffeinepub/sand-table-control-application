import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressPanelProps {
  progress: number;
}

export default function ProgressPanel({ progress }: ProgressPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pattern Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={progress} className="h-3" />
        <p className="text-right text-sm text-muted-foreground">{progress.toFixed(1)}%</p>
      </CardContent>
    </Card>
  );
}

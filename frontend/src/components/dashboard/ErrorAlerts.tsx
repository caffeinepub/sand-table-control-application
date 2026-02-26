import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, HardDrive, Zap } from 'lucide-react';

interface ErrorAlertsProps {
  errors: string[];
}

export default function ErrorAlerts({ errors }: ErrorAlertsProps) {
  if (errors.length === 0) return null;

  const getIcon = (error: string) => {
    if (error.includes('limit')) return <AlertTriangle className="h-4 w-4" />;
    if (error.includes('SD')) return <HardDrive className="h-4 w-4" />;
    if (error.includes('motor')) return <Zap className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <div className="space-y-3">
      {errors.map((error, index) => (
        <Alert key={index} variant="destructive">
          {getIcon(error)}
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

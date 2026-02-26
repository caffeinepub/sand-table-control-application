import { useMachineStatus } from '@/hooks/useMachineStatus';
import StatusCards from '@/components/dashboard/StatusCards';
import ProgressPanel from '@/components/dashboard/ProgressPanel';
import ErrorAlerts from '@/components/dashboard/ErrorAlerts';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, WifiOff } from 'lucide-react';

export default function DashboardPage() {
  const { status, isLoading, error, lastUpdated } = useMachineStatus();

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Live Status Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your sand table in real-time
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            Unable to connect to controller. Please check your connection settings.
          </AlertDescription>
        </Alert>
      )}

      {status && (
        <>
          <StatusCards
            position={status.position}
            currentPattern={status.currentPattern}
            state={status.state}
            lastUpdated={lastUpdated}
          />

          <ProgressPanel progress={status.progress} />

          <ErrorAlerts errors={status.errors} />
        </>
      )}
    </div>
  );
}

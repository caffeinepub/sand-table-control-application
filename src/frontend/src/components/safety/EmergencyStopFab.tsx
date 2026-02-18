import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommandClient } from '@/hooks/useCommandClient';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function EmergencyStopFab() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { sendCommand, isConnected } = useCommandClient();

  const handleEmergencyStop = async () => {
    try {
      await sendCommand('S');
      toast.success('Emergency stop executed');
    } catch (error) {
      toast.error('Emergency stop failed: ' + (error as Error).message);
    }
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        size="lg"
        variant="destructive"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:bottom-4"
        onClick={() => setShowConfirm(true)}
        disabled={!isConnected}
      >
        <AlertTriangle className="h-6 w-6" />
        <span className="sr-only">Emergency Stop</span>
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emergency Stop</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately stop all machine operations. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEmergencyStop} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Stop Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

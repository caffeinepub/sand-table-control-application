import { useEffect, useState } from 'react';
import { useRunSessionStore } from '@/state/runSessionStore';
import { useMachineStatus } from '@/hooks/useMachineStatus';
import { useCommandClient } from '@/hooks/useCommandClient';
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
import { toast } from 'sonner';

export default function ResumePromptDialog() {
  const [open, setOpen] = useState(false);
  const { session, clearSession } = useRunSessionStore();
  const { status } = useMachineStatus();
  const { sendCommand } = useCommandClient();

  useEffect(() => {
    if (session && status && (status.state === 'Running' || status.state === 'Paused')) {
      setOpen(true);
    }
  }, [session, status]);

  const handleResume = async () => {
    try {
      await sendCommand('R');
      toast.success('Pattern resumed');
    } catch (error) {
      toast.error('Failed to resume: ' + (error as Error).message);
    }
    setOpen(false);
  };

  const handleStop = async () => {
    try {
      await sendCommand('S');
      clearSession();
      toast.success('Pattern stopped');
    } catch (error) {
      toast.error('Failed to stop: ' + (error as Error).message);
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resume Pattern?</AlertDialogTitle>
          <AlertDialogDescription>
            A pattern was running when you left. Would you like to resume or stop it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleStop}>Stop</AlertDialogCancel>
          <AlertDialogAction onClick={handleResume}>Resume</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

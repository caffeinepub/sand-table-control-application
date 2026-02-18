import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Home, RotateCcw } from 'lucide-react';
import { useCommandClient } from '@/hooks/useCommandClient';
import { useMachineStatus } from '@/hooks/useMachineStatus';
import { toast } from 'sonner';
import ConfirmDialog from '../safety/ConfirmDialog';

interface RunControlsProps {
  patternId: string;
  onStateChange?: () => void;
}

export default function RunControls({ patternId, onStateChange }: RunControlsProps) {
  const { sendCommand, isConnected } = useCommandClient();
  const { status } = useMachineStatus();
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const [showStopConfirm, setShowStopConfirm] = useState(false);

  const isRunning = status?.state === 'Running';
  const isPaused = status?.state === 'Paused';
  const isIdle = status?.state === 'Idle';

  const handleStart = async () => {
    try {
      await sendCommand(`P${patternId}`);
      await sendCommand('R');
      toast.success('Pattern started');
      onStateChange?.();
    } catch (error) {
      toast.error('Failed to start: ' + (error as Error).message);
    }
  };

  const handlePause = async () => {
    try {
      await sendCommand('P');
      toast.success('Pattern paused');
      onStateChange?.();
    } catch (error) {
      toast.error('Failed to pause: ' + (error as Error).message);
    }
  };

  const handleStop = async () => {
    try {
      await sendCommand('S');
      toast.success('Pattern stopped');
      onStateChange?.();
    } catch (error) {
      toast.error('Failed to stop: ' + (error as Error).message);
    }
    setShowStopConfirm(false);
  };

  const handleHome = async () => {
    try {
      await sendCommand('H');
      toast.success('Homing initiated');
      onStateChange?.();
    } catch (error) {
      toast.error('Failed to home: ' + (error as Error).message);
    }
    setShowHomeConfirm(false);
  };

  const handleRetrace = async () => {
    try {
      await sendCommand('T');
      toast.success('Retrace started');
      onStateChange?.();
    } catch (error) {
      toast.error('Failed to retrace: ' + (error as Error).message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Button
          onClick={handleStart}
          disabled={!isConnected || isRunning}
          className="gap-2"
          size="lg"
        >
          <Play className="h-4 w-4" />
          Start
        </Button>
        <Button
          onClick={handlePause}
          disabled={!isConnected || !isRunning}
          variant="secondary"
          className="gap-2"
          size="lg"
        >
          <Pause className="h-4 w-4" />
          Pause
        </Button>
        <Button
          onClick={() => isRunning ? setShowStopConfirm(true) : handleStop()}
          disabled={!isConnected || isIdle}
          variant="destructive"
          className="gap-2"
          size="lg"
        >
          <Square className="h-4 w-4" />
          Stop
        </Button>
        <Button
          onClick={() => setShowHomeConfirm(true)}
          disabled={!isConnected}
          variant="outline"
          className="gap-2"
          size="lg"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
        <Button
          onClick={handleRetrace}
          disabled={!isConnected || isRunning}
          variant="outline"
          className="gap-2"
          size="lg"
        >
          <RotateCcw className="h-4 w-4" />
          Retrace
        </Button>
      </div>

      <ConfirmDialog
        open={showHomeConfirm}
        onOpenChange={setShowHomeConfirm}
        title="Home Machine"
        description="This will move the machine to its home position. Continue?"
        onConfirm={handleHome}
      />

      <ConfirmDialog
        open={showStopConfirm}
        onOpenChange={setShowStopConfirm}
        title="Stop Pattern"
        description="This will stop the currently running pattern. Continue?"
        onConfirm={handleStop}
      />
    </>
  );
}

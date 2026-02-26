import { sendHttpCommand } from './transports/httpTransport';
import { useConnectionStore } from '@/state/connectionStore';

export async function sendCommand(command: string): Promise<void> {
  const { httpUrl, setStatus, setLastError } = useConnectionStore.getState();

  if (!httpUrl) {
    throw new Error('Controller not configured');
  }

  try {
    setStatus('Connecting');
    await sendHttpCommand(command);
    setStatus('Connected');
    setLastError(null);
  } catch (error) {
    setStatus('Disconnected');
    const message = error instanceof Error ? error.message : 'Command failed';
    setLastError(message);
    throw error;
  }
}

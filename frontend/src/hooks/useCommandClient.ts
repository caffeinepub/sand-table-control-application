import { sendCommand } from '@/controller/commandClient';
import { useConnectionStore } from '@/state/connectionStore';

export function useCommandClient() {
  const { status } = useConnectionStore();

  return {
    sendCommand,
    isConnected: status === 'Connected',
  };
}

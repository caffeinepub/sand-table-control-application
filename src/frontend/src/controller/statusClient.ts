import { useConnectionStore } from '@/state/connectionStore';

export interface MachineStatus {
  position: { x: number; y: number };
  currentPattern: string;
  progress: number;
  state: 'Running' | 'Paused' | 'Homing' | 'Idle';
  errors: string[];
  timestamp: number;
}

export async function fetchMachineStatus(): Promise<MachineStatus> {
  const { httpUrl } = useConnectionStore.getState();

  if (!httpUrl) {
    throw new Error('HTTP URL not configured');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${httpUrl}/status`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      position: data.position || { x: 0, y: 0 },
      currentPattern: data.currentPattern || '',
      progress: data.progress || 0,
      state: data.state || 'Idle',
      errors: data.errors || [],
      timestamp: Date.now(),
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

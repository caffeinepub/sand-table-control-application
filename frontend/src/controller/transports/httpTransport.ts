import { useConnectionStore } from '@/state/connectionStore';

export async function sendHttpCommand(command: string): Promise<void> {
  const { httpUrl } = useConnectionStore.getState();
  
  if (!httpUrl) {
    throw new Error('HTTP URL not configured');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${httpUrl}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Command failed');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Command timeout');
      }
      throw error;
    }
    throw new Error('Unknown error');
  }
}

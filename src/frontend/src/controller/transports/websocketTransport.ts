import { useConnectionStore } from '@/state/connectionStore';

let ws: WebSocket | null = null;

export function connectWebSocket(onMessage: (data: any) => void): void {
  const { wsUrl } = useConnectionStore.getState();
  
  if (!wsUrl || ws?.readyState === WebSocket.OPEN) return;

  try {
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setTimeout(() => connectWebSocket(onMessage), 5000);
    };
  } catch (error) {
    console.error('WebSocket connection error:', error);
  }
}

export function disconnectWebSocket(): void {
  if (ws) {
    ws.close();
    ws = null;
  }
}

export function sendWebSocketCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      reject(new Error('WebSocket not connected'));
      return;
    }

    try {
      ws.send(JSON.stringify({ command }));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ConnectionStatus = 'Connected' | 'Disconnected' | 'Connecting';

interface ConnectionStore {
  httpUrl: string;
  wsUrl: string;
  status: ConnectionStatus;
  lastError: string | null;
  setHttpUrl: (url: string) => void;
  setWsUrl: (url: string) => void;
  setStatus: (status: ConnectionStatus) => void;
  setLastError: (error: string | null) => void;
  testConnection: () => Promise<void>;
}

export const useConnectionStore = create<ConnectionStore>()(
  persist(
    (set, get) => ({
      httpUrl: '',
      wsUrl: '',
      status: 'Disconnected',
      lastError: null,
      setHttpUrl: (url) => set({ httpUrl: url }),
      setWsUrl: (url) => set({ wsUrl: url }),
      setStatus: (status) => set({ status }),
      setLastError: (error) => set({ lastError: error }),
      testConnection: async () => {
        const { httpUrl } = get();
        if (!httpUrl) {
          throw new Error('HTTP URL not configured');
        }

        set({ status: 'Connecting', lastError: null });
        try {
          const response = await fetch(`${httpUrl}/status`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          set({ status: 'Connected', lastError: null });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Connection failed';
          set({ status: 'Disconnected', lastError: message });
          throw error;
        }
      },
    }),
    {
      name: 'connection-store',
    }
  )
);

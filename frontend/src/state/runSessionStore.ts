import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RunSession {
  patternId: string;
  patternName: string;
  startedAt: number;
  lastState: string;
}

interface RunSessionStore {
  session: RunSession | null;
  setSession: (session: RunSession) => void;
  clearSession: () => void;
}

export const useRunSessionStore = create<RunSessionStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'run-session-store',
    }
  )
);

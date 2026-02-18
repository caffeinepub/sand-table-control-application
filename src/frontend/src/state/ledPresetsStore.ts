import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LedPreset {
  color: string;
  brightness: number;
  mode: string;
}

interface LedPresetsStore {
  presets: Record<string, LedPreset>;
  savePreset: (patternId: string, preset: LedPreset) => void;
  getPreset: (patternId: string) => LedPreset | undefined;
  deletePreset: (patternId: string) => void;
}

export const useLedPresetsStore = create<LedPresetsStore>()(
  persist(
    (set, get) => ({
      presets: {},
      savePreset: (patternId, preset) =>
        set((state) => ({
          presets: { ...state.presets, [patternId]: preset },
        })),
      getPreset: (patternId) => get().presets[patternId],
      deletePreset: (patternId) =>
        set((state) => {
          const { [patternId]: _, ...rest } = state.presets;
          return { presets: rest };
        }),
    }),
    {
      name: 'led-presets-store',
    }
  )
);

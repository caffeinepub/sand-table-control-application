export type Command = 'R' | 'S' | 'H' | 'P' | 'T' | string;

export interface CommandResponse {
  success: boolean;
  message?: string;
}

export function parseCommand(cmd: string): { type: string; params?: string } {
  if (cmd.startsWith('P')) {
    return { type: 'P', params: cmd.substring(1) };
  }
  if (cmd.startsWith('LED:')) {
    return { type: 'LED', params: cmd.substring(4) };
  }
  if (cmd.startsWith('SPD:')) {
    return { type: 'SPD', params: cmd.substring(4) };
  }
  return { type: cmd };
}

export function formatLedCommand(r: number, g: number, b: number, brightness: number, mode: string): string {
  return `LED:${r},${g},${b},${brightness},${mode}`;
}

export function formatSpeedCommand(speed: number): string {
  return `SPD:${speed}`;
}

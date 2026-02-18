interface Point {
  x: number;
  y: number;
}

export function generateGCode(path: Point[], speed: number, scale: number): string {
  if (path.length === 0) return '';

  const lines: string[] = [];
  const feedRate = Math.floor((speed / 100) * 1000);
  const scaleFactor = scale / 100;

  lines.push('; Generated G-code');
  lines.push('G21 ; Set units to millimeters');
  lines.push('G90 ; Absolute positioning');
  lines.push('');

  // Move to start position
  const startX = (path[0].x * scaleFactor).toFixed(2);
  const startY = (path[0].y * scaleFactor).toFixed(2);
  lines.push(`G0 X${startX} Y${startY} ; Move to start`);
  lines.push('');

  // Draw path
  for (let i = 1; i < path.length; i++) {
    const x = (path[i].x * scaleFactor).toFixed(2);
    const y = (path[i].y * scaleFactor).toFixed(2);
    lines.push(`G1 X${x} Y${y} F${feedRate}`);
  }

  lines.push('');
  lines.push('G0 X0 Y0 ; Return to origin');
  lines.push('M2 ; End program');

  return lines.join('\n');
}

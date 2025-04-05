export interface Color {
  r: number;
  g: number;
  b: number;
}

export function generateRandomColor(): Color {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
}

export function rgbToHex(color: Color): string {
  const { r, g, b } = color;
  const hex: number = (r << 16) | (g << 8) | b;
  return `#${hex.toString(16).padStart(6, "0")}`;
}

export function hexToRgb(hex: string): Color {
  const hexNumber: number = parseInt(hex.slice(1), 16);
  return {
    r: (hexNumber >> 16) & 0xff,
    g: (hexNumber >> 8) & 0xff,
    b: hexNumber & 0xff,
  };
}

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

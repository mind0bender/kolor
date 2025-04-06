export interface Color {
  r: number;
  g: number;
  b: number;
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

export function contrastColor(color: Color): string {
  const { r, g, b } = color;
  const brightness: number = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#FFFFFF";
}

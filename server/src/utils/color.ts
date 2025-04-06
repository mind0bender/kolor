export interface Color {
  r: number;
  g: number;
  b: number;
}

export function generateRandomPastelColor(): Color {
  const hue: number = Math.floor(Math.random() * 360);
  const saturation: number = Math.floor(Math.random() * 40) + (100 - 40);
  const lightness: number = Math.floor(Math.random() * 40) + (100 - 40);
  const hslToRgb: (h: number, s: number, l: number) => Color = (
    h: number,
    s: number,
    l: number
  ): Color => {
    s /= 100;
    l /= 100;

    const k: (n: number) => number = (n: number): number => (n + h / 30) % 12;
    const a: number = s * Math.min(l, 1 - l);
    const f: (n: number) => number = (n: number): number =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };
  return hslToRgb(hue, saturation, lightness);
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

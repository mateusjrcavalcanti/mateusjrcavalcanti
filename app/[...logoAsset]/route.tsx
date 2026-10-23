import { ImageResponse } from "next/og";

const LOGO_COLORS = {
  orange: "#f97316",
  red: "#ef4444",
  rose: "#f43f5e",
  pink: "#ec4899",
  purple: "#a855f7",
  violet: "#8b5cf6",
  indigo: "#6366f1",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  green: "#22c55e",
  lime: "#84cc16",
  yellow: "#eab308",
  amber: "#f59e0b",
  slate: "#64748b",
  gray: "#6b7280",
  zinc: "#71717a",
  neutral: "#737373",
  black: "#111827",
  white: "#ffffff",
} as const;

const DEFAULT_COLOR_NAME: LogoColorName = "orange";
const FULL_TEXT = "mateusjr";
const SHORT_TEXT = "mj";
const ICON_SIZE = 32;

type LogoColorName = keyof typeof LOGO_COLORS;
type LogoFormat = "svg" | "png" | "ico";
type LogoType = "full" | "short";

type LogoOptions = {
  color: string;
  colorName: LogoColorName;
  format: LogoFormat;
  text: string;
  type: LogoType;
};

type RouteContext = {
  params: Promise<{
    logoAsset?: string[];
  }>;
};

const GLYPHS: Record<string, string[]> = {
  "<": ["001", "010", "100", "010", "001"],
  ">": ["100", "010", "001", "010", "100"],
  a: ["010", "101", "111", "101", "101"],
  e: ["111", "100", "110", "100", "111"],
  j: ["011", "001", "001", "101", "010"],
  m: ["101", "111", "111", "101", "101"],
  r: ["110", "101", "110", "101", "101"],
  s: ["111", "100", "111", "001", "111"],
  t: ["111", "010", "010", "010", "010"],
  u: ["101", "101", "101", "101", "111"],
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const formats: LogoFormat[] = ["svg", "png", "ico"];
  const colors = Object.keys(LOGO_COLORS) as LogoColorName[];
  const defaultAssets = [
    ...formats.map((format) => ({ logoAsset: [`logo.${format}`] })),
    ...formats.map((format) => ({ logoAsset: ["short", `logo.${format}`] })),
    { logoAsset: ["favicon.ico"] },
  ];
  const coloredAssets = colors.flatMap((color) => [
    ...formats.map((format) => ({ logoAsset: [color, `logo.${format}`] })),
    ...formats.map((format) => ({ logoAsset: [color, "short", `logo.${format}`] })),
    { logoAsset: [color, "favicon.ico"] },
  ]);

  return [...defaultAssets, ...coloredAssets];
}

function isLogoColorName(value: string): value is LogoColorName {
  return value in LOGO_COLORS;
}

function parseAssetFile(file: string): { format: LogoFormat; favicon: boolean } | null {
  if (file === "favicon.ico") {
    return { favicon: true, format: "ico" };
  }

  const match = /^logo\.(svg|png|ico)$/.exec(file);
  if (!match) {
    return null;
  }

  return { favicon: false, format: match[1] as LogoFormat };
}

function parseLogoAssetPath(segments: string[]): LogoOptions | null {
  let colorName: LogoColorName = DEFAULT_COLOR_NAME;
  let type: LogoType = "full";
  let file: string | undefined;

  if (segments.length === 1) {
    file = segments[0];
  } else if (segments.length === 2 && segments[0] === "short") {
    type = "short";
    file = segments[1];
  } else if (segments.length === 2 && isLogoColorName(segments[0])) {
    colorName = segments[0];
    file = segments[1];
  } else if (segments.length === 3 && isLogoColorName(segments[0]) && segments[1] === "short") {
    colorName = segments[0];
    type = "short";
    file = segments[2];
  } else {
    return null;
  }

  const asset = file ? parseAssetFile(file) : null;
  if (!asset) {
    return null;
  }

  const logoType = asset.favicon ? "short" : type;

  return {
    color: LOGO_COLORS[colorName],
    colorName,
    format: asset.format,
    text: logoType === "short" ? SHORT_TEXT : FULL_TEXT,
    type: logoType,
  };
}

function createLogoSvg({ color, text }: LogoOptions) {
  const width = text === SHORT_TEXT ? 420 : 760;
  const label = `<${text}/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="240" viewBox="0 0 ${width} 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="${width}" height="240" fill="transparent"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="700" letter-spacing="0">
    <tspan fill="${color}">&lt;</tspan><tspan fill="#111827">${text}</tspan><tspan fill="${color}">/&gt;</tspan>
  </text>
</svg>`;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function setPixel(pixels: Uint8Array, x: number, y: number, color: [number, number, number, number]) {
  if (x < 0 || x >= ICON_SIZE || y < 0 || y >= ICON_SIZE) return;

  const index = (y * ICON_SIZE + x) * 4;
  pixels[index] = color[2];
  pixels[index + 1] = color[1];
  pixels[index + 2] = color[0];
  pixels[index + 3] = color[3];
}

function drawGlyph(
  pixels: Uint8Array,
  glyph: string[],
  x: number,
  y: number,
  scale: number,
  color: [number, number, number, number],
) {
  glyph.forEach((row, rowIndex) => {
    [...row].forEach((cell, colIndex) => {
      if (cell !== "1") return;

      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          setPixel(pixels, x + colIndex * scale + dx, y + rowIndex * scale + dy, color);
        }
      }
    });
  });
}

function drawText(
  pixels: Uint8Array,
  text: string,
  x: number,
  y: number,
  scale: number,
  color: [number, number, number, number],
) {
  [...text].forEach((char, index) => {
    const glyph = GLYPHS[char];
    if (!glyph) return;

    drawGlyph(pixels, glyph, x + index * 4 * scale, y, scale, color);
  });
}

function createLogoIco({ color, type }: LogoOptions) {
  const pixels = new Uint8Array(ICON_SIZE * ICON_SIZE * 4);
  const accent = [...hexToRgb(color), 255] as [number, number, number, number];
  const foreground = [17, 24, 39, 255] as [number, number, number, number];

  if (type === "short") {
    const scale = 2;
    const y = 11;

    drawGlyph(pixels, GLYPHS["<"], 2, y, scale, accent);
    drawGlyph(pixels, GLYPHS.m, 10, y, scale, foreground);
    drawGlyph(pixels, GLYPHS.j, 18, y, scale, foreground);
    drawGlyph(pixels, GLYPHS[">"], 26, y, scale, accent);
  } else {
    drawText(pixels, FULL_TEXT, 0, 13, 1, foreground);
    drawGlyph(pixels, GLYPHS["<"], 1, 5, 1, accent);
    drawGlyph(pixels, GLYPHS[">"], 28, 22, 1, accent);
  }

  const xorStride = ICON_SIZE * 4;
  const xorSize = xorStride * ICON_SIZE;
  const andStride = Math.ceil(ICON_SIZE / 32) * 4;
  const andSize = andStride * ICON_SIZE;
  const bitmapSize = 40 + xorSize + andSize;
  const fileSize = 6 + 16 + bitmapSize;
  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);
  bytes[6] = ICON_SIZE;
  bytes[7] = ICON_SIZE;
  bytes[8] = 0;
  bytes[9] = 0;
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, bitmapSize, true);
  view.setUint32(18, 22, true);

  const dibOffset = 22;
  view.setUint32(dibOffset, 40, true);
  view.setInt32(dibOffset + 4, ICON_SIZE, true);
  view.setInt32(dibOffset + 8, ICON_SIZE * 2, true);
  view.setUint16(dibOffset + 12, 1, true);
  view.setUint16(dibOffset + 14, 32, true);
  view.setUint32(dibOffset + 16, 0, true);
  view.setUint32(dibOffset + 20, xorSize + andSize, true);

  const pixelOffset = dibOffset + 40;
  for (let yIndex = 0; yIndex < ICON_SIZE; yIndex++) {
    const sourceY = ICON_SIZE - 1 - yIndex;
    const sourceOffset = sourceY * xorStride;
    const targetOffset = pixelOffset + yIndex * xorStride;
    bytes.set(pixels.slice(sourceOffset, sourceOffset + xorStride), targetOffset);
  }

  return buffer;
}

function createLogoAssetResponse(options: LogoOptions) {
  if (options.format === "svg") {
    return new Response(createLogoSvg(options), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }

  if (options.format === "ico") {
    return new Response(createLogoIco(options), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/x-icon",
      },
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "transparent",
          color: "#111827",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 96,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: 0,
          padding: "32px 48px",
          width: "100%",
        }}
      >
        <span style={{ color: options.color }}>{"<"}</span>
        <span>{options.text}</span>
        <span style={{ color: options.color }}>{"/>"}</span>
      </div>
    ),
    {
      height: 240,
      width: options.type === "short" ? 420 : 760,
    },
  );
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { logoAsset = [] } = await params;
  const options = parseLogoAssetPath(logoAsset);

  if (!options) {
    return new Response("Not found", { status: 404 });
  }

  return createLogoAssetResponse(options);
}

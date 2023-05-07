const HEX =
  /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/;
const SHORT_HEX = /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])?$/;
const RGBA = /^rgba?\((\d+), ?(\d+), ?(\d+),? ?(\d+)?\)$/;

function getColorWithAlpha(color: string, alpha = 1) {
  const validAlpha = Math.max(Math.min(alpha, 1), 0);

  const rgba = color.match(RGBA);
  if (rgba) {
    return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${validAlpha})`;
  }

  const hex = color.match(HEX) ?? color.match(SHORT_HEX);
  if (!hex) {
    return color;
  }

  const alphaHex = Math.round(255 * validAlpha).toString(16);

  const fix = (s: string) => (s.length === 1 ? s.repeat(2) : s);

  return `#${fix(hex[1])}${fix(hex[2])}${fix(hex[3])}${alphaHex}`.toUpperCase();
}

export default getColorWithAlpha;

// Converts a hex color string (e.g., "#ff00ff") to an RGB string (e.g., "rgb(255, 0, 255)")
export const hexToRgb = (hex) => {
    if (!hex || hex.length !== 7) return 'rgb(0, 0, 0)';
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

// Calculates cost by multiplying weight with a multiplier
export const calculateCost = (weight, country, multiplier) => {
  return weight * parseFloat(multiplier);
};

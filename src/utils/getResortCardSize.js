export const getResortCardSize = (
  width,
  height
) => {
  if (!width || !height) {
    return "standard";
  }

  const ratio = width / height;

  // Wide landscape
  if (ratio >= 1.35) {
    return "compact";
  }

  // Normal landscape / square
  if (ratio >= 1.05) {
    return "standard";
  }

  // Portrait
  if (ratio >= 0.72) {
    return "portrait";
  }

  // Tall portrait
  return "tall";
};
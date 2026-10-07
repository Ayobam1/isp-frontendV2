// src/utils/dateRange.js
const toYMD = (d) => d.toISOString().slice(0, 10);

export const getAvailabilityRange = () => {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const d = now.getUTCDate();
  return {
    min: toYMD(new Date(Date.UTC(y, m, d + 2))),
    max: toYMD(new Date(Date.UTC(y, m + 1, d))),
  };
};

// YYYY-MM-DD strings sort in date order, so plain string comparison works
export const isDateInRange = (value) => {
  const { min, max } = getAvailabilityRange();
  return Boolean(value) && value >= min && value <= max;
};

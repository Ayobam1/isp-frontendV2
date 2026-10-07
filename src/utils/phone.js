// Strips spaces/dashes and restores the leading 0 if the user typed after the +234 badge
export const normalizeNigerianPhone = (value = '') => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('234')) return `+${digits}`;
  if (digits.length === 10) return `0${digits}`;
  return digits;
};
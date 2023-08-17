export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const K_5_MIN = BigInt(300);

export const K_1_DAY = BigInt(86400);

export const K_1_WEEK = BigInt(604800);

export const daysToSeconds = (days: number) => {
  return BigInt(days * 60 * 60 * 24);
};

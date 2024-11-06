import Crypto from 'crypto';

export const add = (a: number, b: number): number => {
  return a + b;
};

export const generateRandomId = (size = 4): string => {
  return Crypto.randomBytes(size).toString('hex').slice(0, size);
};

export const sucessRegMessage = (roleType: string): string => `${roleType} registered successfully`;
export const errorMessage = (roleType: string): string => `${roleType} not found`;

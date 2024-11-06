// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecret';

export const generateAccessToken = (user: { id: number; email: string }) => {
  return jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: { id: number; email: string }) => {
  return jwt.sign(user, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};

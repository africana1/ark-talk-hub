import { getUnixTime } from 'date-fns';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { TOKEN_TYPE } from '../utils/enums';

export const generateToken = (userId: string, expires: Date, type: string, role: string): string => {
  const payload = {
    sub: userId,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(expires),
    type,
    role,
  };

  const secret = type === TOKEN_TYPE.ACCESS ? config.jwt.accessTokenSecret : config.jwt.refreshTokenSecret;

  return jwt.sign(payload, secret);
};

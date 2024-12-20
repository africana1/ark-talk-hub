import { Token, NewToken } from './token.interface';
import { TokenRepository } from './token.repository';
import { add } from 'date-fns';
import { Admin } from '../admin';
import { generateToken } from './token.gen';
import { TOKEN_TYPE } from '../utils/enums';
import config from '../config/config';

export class TokenService {
  private tokenRepository = new TokenRepository();

  async createToken(data: NewToken): Promise<Token> {
    return this.tokenRepository.createToken(data);
  }

  async findTokenById(id: string): Promise<Token | null> {
    return this.tokenRepository.findTokenById(id);
  }

  async deleteToken(id: string): Promise<void> {
    await this.tokenRepository.delete(id);
  }

  async generateAuthTokens(user: Admin, role: string) {
    const accessTokenExpires = add(new Date(), {
      minutes: parseInt(config.jwt.accessExpirationMinutes),
    });

    const accessToken = generateToken(user.id, accessTokenExpires, TOKEN_TYPE.ACCESS, role);

    const refreshTokenExpires = add(new Date(), {
      days: parseInt(config.jwt.refreshExpirationDays),
    });

    const refreshToken = generateToken(user.id, refreshTokenExpires, TOKEN_TYPE.REFRESH, role);

    const payLoad = {
      token: refreshToken,
      userId: user.id,
      expires: accessTokenExpires,
      type: TOKEN_TYPE.REFRESH,
    };

    //await this.createToken(payLoad);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires,
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires,
      },
    };
  }
}

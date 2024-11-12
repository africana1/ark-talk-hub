import { PrismaClient, Token } from '@prisma/client';
import { ITokenRepository, NewToken } from './token.interface';
import { TOKEN_TYPE } from '../utils/enums';

const { token } = new PrismaClient();

export class TokenRepository implements ITokenRepository {
  async createToken(data: NewToken): Promise<Token> {
    return token.create({ data });
  }

  async findTokenById(id: string): Promise<Token | null> {
    return token.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    await token.deleteMany({
      where: { id },
    });
  }
}

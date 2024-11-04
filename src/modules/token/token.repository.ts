import { PrismaClient, Token } from '@prisma/client';
import { ITokenRepository, NewToken } from './token.interface';

const { token } = new PrismaClient();

export class TokenRepository implements ITokenRepository {
  async create(data: NewToken): Promise<Token> {
    return token.create({ data });
  }

  async findById(id: string): Promise<Token | null> {
    return token.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    await token.delete({
      where: { id },
    });
  }
}

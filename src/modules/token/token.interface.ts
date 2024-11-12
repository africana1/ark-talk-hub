import { Token as TokenModel } from '@prisma/client';

export interface IToken {
  token: string;
  userId: string;
  type: string;
  expires: Date;
}

export type NewToken = Omit<TokenModel, 'id' | 'createdAt' | 'updatedAt'>;
export type Token = Partial<TokenModel>;

export interface ITokenRepository {
  createToken(data: NewToken): Promise<TokenModel>;
  findTokenById(id: string): Promise<TokenModel | null>;
  delete(id: string): Promise<void>;
}

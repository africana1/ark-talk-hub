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
  saveToken(data: NewToken): Promise<TokenModel>;
  verifyToken(id: string): Promise<TokenModel | null>;
  delete(id: string): Promise<void>;
}

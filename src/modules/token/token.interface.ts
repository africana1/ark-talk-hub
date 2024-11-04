import { Token as TokenModel } from '@prisma/client';

export interface IToken {
  token: string;
  user: string;
  type: string;
  expires: Date;
}

export type NewToken = Omit<TokenModel, 'id' | 'createdAt' | 'updatedAt'>;
export type Token = Partial<TokenModel>;

export interface ITokenRepository {
  create(data: NewToken): Promise<TokenModel>;
  findById(id: string): Promise<TokenModel | null>;
  delete(id: string): Promise<void>;
}

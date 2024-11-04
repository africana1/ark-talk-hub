import { ITokenRepository, Token, NewToken } from './token.interface';
import { TokenRepository } from './token.repository';

export class TokenService {
  private tokenRepository = new TokenRepository();

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async create(data: NewToken): Promise<Token> {
    return this.tokenRepository.create(data);
  }

  async getTokenById(id: string): Promise<Token | null> {
    return this.tokenRepository.findById(id);
  }

  async deleteToken(id: string): Promise<void> {
    await this.tokenRepository.delete(id);
  }
}

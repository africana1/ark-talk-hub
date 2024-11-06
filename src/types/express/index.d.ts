import { IAuthUser as User } from '../../modules/auth';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

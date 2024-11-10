import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { ApiError } from '../errors';
import { ROLE, ERROR_MSG } from '../utils/enums';
import { IAuthUser as User } from './auth.interface';

// Middleware to authenticate JWT and handle unauthorized access
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, ERROR_MSG.AUTHENTICATE_ERR));
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware to allow only admins
export const isAdmin = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
  // @ts-expect-error: req.user is defined globally
  if (req.user && req.user.role === ROLE.ADMIN) {
    return next();
  }
  res.status(httpStatus.FORBIDDEN).json({ statsus: httpStatus.FORBIDDEN, message: ERROR_MSG.ACESS_DENIED });
};

// Middleware to allow only attendees
export const isAttendee = (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
  // @ts-expect-error: req.user is defined globally
  if (req.user && !req.user.role === ROLE.ATTENDEE) {
    return next();
  }
  res.status(httpStatus.FORBIDDEN).json({ statsus: httpStatus.FORBIDDEN, message: ERROR_MSG.ACESS_DENIED });
};

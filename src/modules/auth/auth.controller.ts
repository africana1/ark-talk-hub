import { Request, Response } from 'express';
import { StatusCodes as httpStatus } from 'http-status-codes';
import * as authService from './auth.service';
import { AdminService } from '../admin';
import { AttendeeService } from '../attendee';
import { TokenService } from '../token';
import { ROLE_TYPE, NODE_ENV } from '../utils/enums';
import { catchAsync, sucessRegMessage } from '../utils';
import config from '../config/config';

const adminService = new AdminService();
const attendeeService = new AttendeeService();
const tokenService = new TokenService();

export const registerAdmin = catchAsync(async (req: Request, res: Response) => {
  await adminService.createAdmin(req.body);
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: sucessRegMessage(ROLE_TYPE.ADMIN) });
});

export const registerAttendee = catchAsync(async (req: Request, res: Response) => {
  await attendeeService.createAttendee(req.body);
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: sucessRegMessage(ROLE_TYPE.ATTENDEE) });
});

export const attendeeLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginAttendeeWithEmailAndPassword(email, password);
  const role = ROLE_TYPE.ATTENDEE.toLowerCase();
  const tokens = await tokenService.generateAuthTokens(user, role);

  const { access: accessToken, refresh: refreshToken } = tokens;

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: config.env === NODE_ENV.PRODUCTION,
    maxAge: parseInt(config.jwt.refreshExpirationDays),
  });

  const userData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    registrationId: user.registrationId,
    createdAt: user.createdAt,
  };

  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: { user: userData, accessToken } });
});

export const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginAdminWithEmailAndPassword(email, password);
  const role = ROLE_TYPE.ADMIN.toLowerCase();
  const tokens = await tokenService.generateAuthTokens(user, role);

  const { access: accessToken, refresh: refreshToken } = tokens;

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: config.env === NODE_ENV.PRODUCTION,
    maxAge: parseInt(config.jwt.refreshExpirationDays),
  });

  const userData = {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: { user: userData, accessToken } });
});

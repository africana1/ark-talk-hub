import bcrypt from 'bcryptjs';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { AdminRepository } from '../admin';
import { AttendeeRepository } from '../attendee';
import { ApiError } from '../errors';
import { Attendee, Admin } from '@prisma/client';
import { ERROR_MSG } from '../utils/enums';

const adminService = new AdminRepository();
const attendeeService = new AttendeeRepository();

export const loginAttendeeWithEmailAndPassword = async (email: string, password: string): Promise<Attendee> => {
  const attendee = await attendeeService.findByEmail(email);
  if (!attendee) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MSG.INVALID_EMAIL_PASSWORD);
  }

  const isValidPassword = await bcrypt.compare(password, attendee.password);
  if (!isValidPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MSG.INVALID_EMAIL_PASSWORD);
  }
  return attendee;
};

export const loginAdminWithEmailAndPassword = async (email: string, password: string): Promise<Admin> => {
  const admin = await adminService.findByEmail(email);
  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MSG.INVALID_EMAIL_PASSWORD);
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MSG.INVALID_EMAIL_PASSWORD);
  }
  return admin;
};

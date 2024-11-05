import { Request, Response } from 'express';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { catchAsync } from '../utils';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { errorMessage } from '../utils/';
import { ERROR_TYPE } from '../utils/enums';

const adminService = new AdminService(new AdminRepository());

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const admin = await adminService.createAdmin(req.body);
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: admin });
});

export const getAdmins = catchAsync(async (_req: Request, res: Response) => {
  const admins = await adminService.getAdmins();
  res.status(httpStatus.OK).json({ status: httpStatus.OK, count: admins.length, data: admins });
});

export const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await adminService.getAdminById(id);
  if (admin) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: admin });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ERROR_TYPE.ADMIN) });
  }
});

export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const admin = await adminService.updateAdmin(id, data);
  if (admin) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: admin });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ERROR_TYPE.ADMIN) });
  }
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const admin = await adminService.getAdminById(id);
  if (admin) {
    await adminService.deleteAdmin(id);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ERROR_TYPE.ADMIN) });
  }
});

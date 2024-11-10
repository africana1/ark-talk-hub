import { Admin, NewAdmin, UpdateAdmin } from './admin.types';
import { IAdminRepository } from './admin.interface';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import * as adminController from './admin.controller';
import * as adminValidation from './admin.validation';
import adminRoute from './admin.route';

export {
  Admin,
  NewAdmin,
  UpdateAdmin,
  IAdminRepository,
  AdminRepository,
  AdminService,
  adminController,
  adminRoute,
  adminValidation,
};

import express from 'express';
import * as adminController from './admin.controller';
import * as adminValidation from './admin.validation';
import { validate } from '../validation';
const router = express.Router();

router
  .get('/', validate(adminValidation.getAdmins), adminController.getAdmins)
  .post('/', validate(adminValidation.createAdmin), adminController.createAdmin);

router
  .get('/:id', validate(adminValidation.getAdmin), adminController.getAdminById)
  .patch('/:id', validate(adminValidation.updateAdmin), adminController.updateAdmin)
  .delete('/:id', validate(adminValidation.deleteAdmin), adminController.deleteAdmin);

export default router;

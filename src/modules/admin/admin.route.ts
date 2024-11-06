import express from 'express';
import * as adminController from './admin.controller';
import * as adminValidation from './admin.validation';
import { authenticateJWT, isAdmin } from '../auth/auth.middleware';
import { validate } from '../validation';
const router = express.Router();

router.use(authenticateJWT, isAdmin);
router.get('/', validate(adminValidation.getAdmins), adminController.getAdmins);

router
  .get('/:id', validate(adminValidation.getAdmin), adminController.getAdminById)
  .patch('/:id', validate(adminValidation.updateAdmin), adminController.updateAdmin)
  .delete('/:id', validate(adminValidation.deleteAdmin), adminController.deleteAdmin);

export default router;

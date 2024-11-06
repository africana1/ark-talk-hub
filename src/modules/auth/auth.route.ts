import express from 'express';
import * as authController from './auth.controller';
import { authenticateJWT, isAdmin } from '../auth/auth.middleware';
import { validate } from '../validation';
import { adminValidation } from '../admin';
import { attendeeValidation } from '../attendee';

const router = express.Router();

router.post('/register', validate(attendeeValidation.createAttendee), authController.registerAttendee);
router.post('/login', validate(attendeeValidation.attendeeLogin), authController.attendeeLogin);
router.post('/login-admin', validate(adminValidation.signUpAndLogin), authController.adminLogin);
//router.post('/logout', authController.logout);

router.use(authenticateJWT, isAdmin);
router.post('/register-admin', validate(adminValidation.signUpAndLogin), authController.registerAdmin);

export default router;

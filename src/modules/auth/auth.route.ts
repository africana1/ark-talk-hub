import express from 'express';
import * as authController from './auth.controller';
import { authenticateJWT, isAdmin } from '../auth/auth.middleware';
import { validate } from '../validation';
import { adminValidation } from '../admin';
import { attendeeValidation } from '../attendee';

const router = express.Router();

router.post('/attendee-sign-up', validate(attendeeValidation.createAttendee), authController.registerAttendee);
router.post('/attendee-sign-in', validate(attendeeValidation.attendeeLogin), authController.attendeeLogin);
router.post('/admin-sign-in', validate(adminValidation.signUpAndLogin), authController.adminLogin);
//router.post('/logout', authController.logout);

router.use(authenticateJWT);
//router.use(isAdmin);
router.post('/admin-sign-up', validate(adminValidation.signUpAndLogin), authController.registerAdmin);

export default router;

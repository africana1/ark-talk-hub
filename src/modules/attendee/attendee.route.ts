import express from 'express';
import * as attendeeController from './attendee.controller';
import * as attendeeValidation from './attendee.validation';
import { validate } from '../validation';
import { authenticateJWT, isAdmin } from '../auth/auth.middleware';

const router = express.Router();

router.use(authenticateJWT);
router.get('/:id', validate(attendeeValidation.getAttendee), attendeeController.getAttendeeById);

router.use(authenticateJWT, isAdmin);
router.get('/', validate(attendeeValidation.getAttendees), attendeeController.getAttendees);
router.patch('/:id', validate(attendeeValidation.updateAttendee), attendeeController.updateAttendee);
router.delete('/:id', validate(attendeeValidation.deleteAttendee), attendeeController.deleteAttendee);

export default router;

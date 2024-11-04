import express from 'express';
import * as attendeeController from './attendee.controller';
import * as attendeeValidation from './attendee.validation';
import { validate } from '../validation';
const router = express.Router();

router
  .get('/', validate(attendeeValidation.getAttendees), attendeeController.getAttendees)
  .post('/', validate(attendeeValidation.createAttendee), attendeeController.createAttendee);

router
  .get('/:id', validate(attendeeValidation.getAttendee), attendeeController.getAttendeeById)
  .patch('/:id', validate(attendeeValidation.updateAttendee), attendeeController.updateAttendee)
  .delete('/:id', validate(attendeeValidation.deleteAttendee), attendeeController.deleteAttendee);

export default router;

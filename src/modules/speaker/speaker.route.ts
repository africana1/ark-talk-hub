import express from 'express';
import * as speakerController from './speaker.controller';
import * as speakerValidation from './speaker.validation';
import { validate } from '../validation';
import { authenticateJWT, isAdmin } from '../auth/auth.middleware';

const router = express.Router();

router.use(authenticateJWT);
router
  .get('/', validate(speakerValidation.getSpeakers), speakerController.getSpeakers)
  .post('/', validate(speakerValidation.createSpeaker), speakerController.createSpeaker);

router.use(isAdmin);
router
  .get('/:id', validate(speakerValidation.getSpeaker), speakerController.getSpeakerById)
  .patch('/:id', validate(speakerValidation.updateSpeaker), speakerController.updateSpeaker)
  .delete('/:id', validate(speakerValidation.deleteSpeaker), speakerController.deleteSpeaker);

export default router;

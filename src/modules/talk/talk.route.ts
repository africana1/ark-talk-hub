import express from 'express';
import * as talkController from './talk.controller';
import * as talkValidation from './talk.validation';
import { validate } from '../validation';
import { authenticateJWT } from '../auth/auth.middleware';

const router = express.Router();
router.use(authenticateJWT);
router
  .get('/', validate(talkValidation.getTalks), talkController.getTalks)
  .post('/', validate(talkValidation.createTalk), talkController.createTalk);

router
  .get('/:id', validate(talkValidation.getTalk), talkController.getTalkById)
  .patch('/:id', validate(talkValidation.updateTalk), talkController.updateTalk)
  .delete('/:id', validate(talkValidation.deleteTalk), talkController.deleteTalk);

export default router;

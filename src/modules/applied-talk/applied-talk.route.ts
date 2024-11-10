import express from 'express';
import * as appliedTalkController from './applied-talk.controller';
import * as appliedTalkValidation from './applied-talk.validation';
import { validate } from '../validation';
import { authenticateJWT } from '../auth/auth.middleware';

const router = express.Router();
router.use(authenticateJWT);
router
  .get('/', validate(appliedTalkValidation.getAppliedTalks), appliedTalkController.getAppliedTalks)
  .post('/', validate(appliedTalkValidation.createAppliedTalk), appliedTalkController.createAppliedTalk);

router
  .get('/:id', validate(appliedTalkValidation.getAppliedTalk), appliedTalkController.getAppliedTalkById)
  .patch('/:id', validate(appliedTalkValidation.updateAppliedTalk), appliedTalkController.updateAppliedTalk)
  .delete('/:id', validate(appliedTalkValidation.deleteAppliedTalk), appliedTalkController.deleteAppliedTalk);

export default router;

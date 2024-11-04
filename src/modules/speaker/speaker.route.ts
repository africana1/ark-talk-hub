import express from 'express';
import * as speakerController from './speaker.controller';

const router = express.Router();

router.post('/', speakerController.createSpeaker);
router.get('/', speakerController.getSpeakers);
router.get('/:id', speakerController.getSpeakerById);
router.patch('/:id', speakerController.updateSpeaker);
router.delete('/:id', speakerController.deleteSpeaker);

export default router;

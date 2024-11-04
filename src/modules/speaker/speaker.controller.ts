import { Request, Response } from 'express';
import { SpeakerRepository } from './speaker.repository';
import { SpeakerService } from './speaker.service';
import { catchAsync } from '../utils';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { ERROR } from '../utils/enums';

const speakerService = new SpeakerService(new SpeakerRepository());

export const createSpeaker = catchAsync(async (req: Request, res: Response) => {
  const speaker = await speakerService.createSpeaker(req.body);
  res.status(httpStatus.CREATED).json(speaker);
});

export const getSpeakers = catchAsync(async (_req: Request, res: Response) => {
  const speakers = await speakerService.getSpeakers();
  res.status(httpStatus.OK).json(speakers);
});

export const getSpeakerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const speaker = await speakerService.getSpeakerById(id);
  if (speaker) {
    res.status(httpStatus.OK).json(speaker);
  } else {
    res.status(404).json({ error: ERROR.SPEAKER_NOT_FOUND });
  }
});

export const updateSpeaker = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const speaker = await speakerService.updateSpeaker(id, data);
  if (speaker) {
    res.status(httpStatus.OK).json(speaker);
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ error: ERROR.SPEAKER_NOT_FOUND });
  }
});

export const deleteSpeaker = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const speaker = await speakerService.getSpeakerById(id);
  if (speaker) {
    await speakerService.deleteSpeaker(id);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ error: ERROR.SPEAKER_NOT_FOUND });
  }
});

import { Request, Response } from 'express';
import { SpeakerService } from './speaker.service';
import { catchAsync } from '../utils';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { errorMessage } from '../utils/';
import { ROLE_TYPE } from '../utils/enums';

const speakerService = new SpeakerService();

export const createSpeaker = catchAsync(async (req: Request, res: Response) => {
  const speaker = await speakerService.createSpeaker(req.body);
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: speaker });
});

export const getSpeakers = catchAsync(async (_req: Request, res: Response) => {
  const speakers = await speakerService.getSpeakers();
  res.status(httpStatus.OK).json({ status: httpStatus.OK, count: speakers.length, data: speakers });
});

export const getSpeakerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const speaker = await speakerService.getSpeakerById(id);
  if (speaker) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: speaker });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.SPEAKER) });
  }
});

export const updateSpeaker = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const speaker = await speakerService.updateSpeaker(id, data);
  if (speaker) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: speaker });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.SPEAKER) });
  }
});

export const deleteSpeaker = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const speaker = await speakerService.getSpeakerById(id);
  if (speaker) {
    await speakerService.deleteSpeaker(id);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.SPEAKER) });
  }
});

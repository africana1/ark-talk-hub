import { Request, Response } from 'express';
import { TalkService } from './talk.service';
import { catchAsync } from '../utils';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { errorMessage } from '../utils';
import { ROLE_TYPE } from '../utils/enums';

const talkService = new TalkService();

export const createTalk = catchAsync(async (req: Request, res: Response) => {
  const talk = await talkService.createTalk(req.body);
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: talk });
});

export const getTalks = catchAsync(async (_req: Request, res: Response) => {
  const talks = await talkService.getTalks();
  res.status(httpStatus.OK).json({ status: httpStatus.OK, count: talks.length, data: talks });
});

export const getTalkById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const talk = await talkService.getTalkById(id);
  if (talk) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: talk });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.TALK) });
  }
});

export const updateTalk = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const talk = await talkService.updateTalk(id, data);
  if (talk) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: talk });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.TALK) });
  }
});

export const deleteTalk = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const talk = await talkService.getTalkById(id);
  if (talk) {
    await talkService.deleteTalk(id);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.TALK) });
  }
});

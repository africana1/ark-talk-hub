import { Request, Response } from 'express';
import { AppliedTalkService } from './applied-talk.service';
import { catchAsync } from '../utils';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { errorMessage } from '../utils';
import { ROLE_TYPE } from '../utils/enums';

const appliedTalkService = new AppliedTalkService();

export const createAppliedTalk = catchAsync(async (req: Request, res: Response) => {
  const talk = await appliedTalkService.createAppliedTalk(req.body);
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: talk });
});

export const getAppliedTalks = catchAsync(async (_req: Request, res: Response) => {
  const talks = await appliedTalkService.getAppliedTalks();
  res.status(httpStatus.OK).json({ status: httpStatus.OK, count: talks.length, data: talks });
});

export const getAppliedTalkById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const talk = await appliedTalkService.getAppliedTalkById(id);
  if (talk) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: talk });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.TALK) });
  }
});

export const updateAppliedTalk = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const talk = await appliedTalkService.updateAppliedTalk(id, data);
  if (talk) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: talk });
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.TALK) });
  }
});

export const deleteAppliedTalk = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const talk = await appliedTalkService.getAppliedTalkById(id);
  if (talk) {
    await appliedTalkService.deleteAppliedTalk(id);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.TALK) });
  }
});

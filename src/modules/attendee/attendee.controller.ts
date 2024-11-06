import { Request, Response } from 'express';
import { AttendeeService } from './attendee.service';
import { catchAsync } from '../utils';
import { StatusCodes as httpStatus } from 'http-status-codes';
import { errorMessage } from '../utils/';
import { ROLE_TYPE } from '../utils/enums';

const attendeeService = new AttendeeService();

export const createAttendee = catchAsync(async (req: Request, res: Response) => {
  const attendee = await attendeeService.createAttendee(req.body);
  const attendeeData = {
    id: attendee.id,
    firstName: attendee.firstName,
    lastName: attendee.lastName,
    email: attendee.email,
    phone: attendee.phone,
    role: attendee.role,
    registrationId: attendee.registrationId,
    createdAt: attendee.createdAt,
  };
  res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, data: attendeeData });
});

export const getAttendees = catchAsync(async (_req: Request, res: Response) => {
  const attendees = await attendeeService.getAttendees();
  res.status(httpStatus.OK).json({ status: httpStatus.OK, count: attendees.length, data: attendees });
});

export const getAttendeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const attendee = await attendeeService.getAttendeeById(id);
  if (attendee) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: attendee });
  } else {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.ATTENDEE) });
  }
});

export const updateAttendee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const attendee = await attendeeService.updateAttendee(id, data);
  if (attendee) {
    res.status(httpStatus.OK).json({ status: httpStatus.OK, data: attendee });
  } else {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.ATTENDEE) });
  }
});

export const deleteAttendee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const attendee = await attendeeService.getAttendeeById(id);
  if (attendee) {
    await attendeeService.deleteAttendee(id);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: httpStatus.BAD_REQUEST, error: errorMessage(ROLE_TYPE.ATTENDEE) });
  }
});

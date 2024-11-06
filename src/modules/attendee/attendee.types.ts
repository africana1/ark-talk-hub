import { Attendee as AttendeeModel } from '@prisma/client';

export type NewAttendee = Omit<AttendeeModel, 'id' | 'createdAt' | 'updatedAt'>;

export type Attendee = Omit<AttendeeModel, 'password' | 'updatedAt'>;

export type UpdateAttendee = Partial<AttendeeModel>;

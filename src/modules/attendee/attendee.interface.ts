import { NewAttendee, Attendee, UpdateAttendee } from './attendee.types';

export interface IAttendeeRepository {
  create(data: NewAttendee): Promise<Attendee>;
  findAll(): Promise<Attendee[]>;
  findById(id: string): Promise<Attendee | null>;
  findByEmail(email: string): Promise<Attendee | null>;
  findByPhone(phone: string): Promise<Attendee | null>;
  update(id: string, data: UpdateAttendee): Promise<Attendee | null>;
  delete(id: string): Promise<void>;
}

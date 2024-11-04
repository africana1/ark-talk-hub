import { PrismaClient } from '@prisma/client';
import { IAttendeeRepository } from './attendee.interface';
import { NewAttendee, Attendee, UpdateAttendee } from './attendee.types';

const { attendee } = new PrismaClient();

export class AttendeeRepository implements IAttendeeRepository {
  async create(data: NewAttendee): Promise<Attendee> {
    return attendee.create({ data });
  }

  async findAll(): Promise<Attendee[]> {
    return attendee.findMany({
      include: { talk: true },
    });
  }

  async findById(id: string): Promise<Attendee | null> {
    return attendee.findUnique({
      where: { id },
      include: { talk: true },
    });
  }

  async findByEmail(email: string): Promise<Attendee | null> {
    return attendee.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string): Promise<Attendee | null> {
    return attendee.findUnique({
      where: { phone },
    });
  }

  async update(id: string, data: UpdateAttendee): Promise<Attendee | null> {
    return attendee.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await attendee.delete({
      where: { id },
    });
  }
}

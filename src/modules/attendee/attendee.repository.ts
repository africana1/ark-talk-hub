import { PrismaClient, Attendee as AttendeeModel } from '@prisma/client';
import { IAttendeeRepository } from './attendee.interface';
import { NewAttendee, Attendee, UpdateAttendee } from './attendee.types';

const { attendee } = new PrismaClient();

export class AttendeeRepository implements IAttendeeRepository {
  async create(data: NewAttendee): Promise<AttendeeModel> {
    return attendee.create({ data });
  }

  async findAll(): Promise<Attendee[]> {
    return attendee.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        registrationId: true,
        firstName: true,
        lastName: true,
        password: false,
        createdAt: true,
        updatedAt: false,
        talk: true,
      },
    });
  }

  async findById(id: string): Promise<Attendee | null> {
    return attendee.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        registrationId: true,
        firstName: true,
        lastName: true,
        password: false,
        createdAt: true,
        updatedAt: false,
        talk: true,
      },
    });
  }

  async findByEmail(email: string): Promise<AttendeeModel | null> {
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

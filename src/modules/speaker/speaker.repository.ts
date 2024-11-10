import { PrismaClient } from '@prisma/client';
import { ISpeakerRepository } from './speaker.interface';
import { NewSpeaker, Speaker, UpdateSpeaker } from './speaker.types';

const { speaker } = new PrismaClient();

export class SpeakerRepository implements ISpeakerRepository {
  async create(data: NewSpeaker): Promise<Speaker> {
    return speaker.create({ data });
  }

  async findAll(): Promise<Speaker[]> {
    return speaker.findMany({
      include: { talk: true },
    });
  }

  async findById(id: string): Promise<Speaker | null> {
    return speaker.findUnique({
      where: { id },
      include: { talk: true },
    });
  }

  async findByEmail(email: string): Promise<Speaker | null> {
    return speaker.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string): Promise<Speaker | null> {
    return speaker.findUnique({
      where: { phone },
    });
  }

  async update(id: string, data: UpdateSpeaker): Promise<Speaker | null> {
    return speaker.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await speaker.delete({
      where: { id },
    });
  }
}

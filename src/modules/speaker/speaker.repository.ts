import { PrismaClient } from '@prisma/client';
import { ISpeakerRepository } from './speaker.interface';
import { NewSpeaker, Speaker, UpdateSpeaker } from './speaker.types';

const prisma = new PrismaClient();

export class SpeakerRepository implements ISpeakerRepository {
  async create(data: NewSpeaker): Promise<Speaker> {
    return prisma.speaker.create({ data });
  }

  async findAll(): Promise<Speaker[]> {
    return prisma.speaker.findMany({
      include: { talk: true },
    });
  }

  async findById(id: string): Promise<Speaker | null> {
    return prisma.speaker.findUnique({
      where: { id },
      include: { talk: true },
    });
  }

  async update(id: string, data: UpdateSpeaker): Promise<Speaker | null> {
    return prisma.speaker.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.speaker.delete({
      where: { id },
    });
  }
}

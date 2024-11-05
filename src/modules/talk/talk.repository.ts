import { PrismaClient } from '@prisma/client';
import { ITalkRepository } from './talk.interface';
import { NewTalk, Talk, UpdateTalk } from './talk.types';

const { talk } = new PrismaClient();

export class TalkRepository implements ITalkRepository {
  async create(data: NewTalk): Promise<Talk> {
    return talk.create({ data });
  }

  async findAll(): Promise<Talk[]> {
    return talk.findMany({
      include: { attendee: true },
    });
  }

  async findById(id: string): Promise<Talk | null> {
    return talk.findUnique({
      where: { id },
      include: { attendee: true },
    });
  }

  async update(id: string, data: UpdateTalk): Promise<Talk | null> {
    return talk.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await talk.delete({
      where: { id },
    });
  }
}

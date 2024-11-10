import { PrismaClient } from '@prisma/client';
import { IAppliedTalkRepository } from './applied-talk.interface';
import { NewAppliedTalk, AppliedTalk, UpdateAppliedTalk } from './applied-talk.types';

const { appliedTalk } = new PrismaClient();

export class AppliedTalkRepository implements IAppliedTalkRepository {
  async create(data: NewAppliedTalk): Promise<AppliedTalk> {
    return appliedTalk.create({ data });
  }

  async findAll(): Promise<AppliedTalk[]> {
    return appliedTalk.findMany();
  }

  async findById(id: string): Promise<AppliedTalk | null> {
    return appliedTalk.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateAppliedTalk): Promise<AppliedTalk | null> {
    return appliedTalk.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await appliedTalk.delete({
      where: { id },
    });
  }
}

import { IAppliedTalkRepository } from './applied-talk.interface';
import { AppliedTalkRepository } from './applied-talk.repository';
import { NewAppliedTalk, AppliedTalk, UpdateAppliedTalk } from './applied-talk.types';

export class AppliedTalkService {
  private appliedTalkRepository = new AppliedTalkRepository();

  async createAppliedTalk(data: NewAppliedTalk): Promise<AppliedTalk> {
    return this.appliedTalkRepository.create(data);
  }

  async getAppliedTalks(): Promise<AppliedTalk[]> {
    return this.appliedTalkRepository.findAll();
  }

  async getAppliedTalkById(id: string): Promise<AppliedTalk | null> {
    return this.appliedTalkRepository.findById(id);
  }

  async updateAppliedTalk(id: string, data: UpdateAppliedTalk): Promise<AppliedTalk | null> {
    return this.appliedTalkRepository.update(id, data);
  }

  async deleteAppliedTalk(id: string): Promise<void> {
    await this.appliedTalkRepository.delete(id);
  }
}

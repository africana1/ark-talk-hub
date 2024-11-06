import { ITalkRepository } from './talk.interface';
import { TalkRepository } from './talk.repository';
import { NewTalk, Talk, UpdateTalk } from './talk.types';

export class TalkService {
  private talkRepository = new TalkRepository();

  async createTalk(data: NewTalk): Promise<Talk> {
    return this.talkRepository.create(data);
  }

  async getTalks(): Promise<Talk[]> {
    return this.talkRepository.findAll();
  }

  async getTalkById(id: string): Promise<Talk | null> {
    return this.talkRepository.findById(id);
  }

  async updateTalk(id: string, data: UpdateTalk): Promise<Talk | null> {
    return this.talkRepository.update(id, data);
  }

  async deleteTalk(id: string): Promise<void> {
    await this.talkRepository.delete(id);
  }
}

import { NewTalk, Talk, UpdateTalk } from './talk.types';

export interface ITalkRepository {
  create(data: NewTalk): Promise<Talk>;
  findAll(): Promise<Talk[]>;
  findById(id: string): Promise<Talk | null>;
  update(id: string, data: UpdateTalk): Promise<Talk | null>;
  delete(id: string): Promise<void>;
}

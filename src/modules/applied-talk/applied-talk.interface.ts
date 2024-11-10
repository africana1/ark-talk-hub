import { NewAppliedTalk, AppliedTalk, UpdateAppliedTalk } from './applied-talk.types';

export interface IAppliedTalkRepository {
  create(data: NewAppliedTalk): Promise<AppliedTalk>;
  findAll(): Promise<AppliedTalk[]>;
  findById(id: string): Promise<AppliedTalk | null>;
  update(id: string, data: UpdateAppliedTalk): Promise<AppliedTalk | null>;
  delete(id: string): Promise<void>;
}

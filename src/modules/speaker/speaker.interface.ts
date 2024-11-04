import { NewSpeaker, Speaker, UpdateSpeaker } from './speaker.types';

export interface ISpeakerRepository {
  create(data: NewSpeaker): Promise<Speaker>;
  findAll(): Promise<Speaker[]>;
  findById(id: string): Promise<Speaker | null>;
  findByEmail(email: string): Promise<Speaker | null>;
  findByPhone(phone: string): Promise<Speaker | null>;
  update(id: string, data: UpdateSpeaker): Promise<Speaker | null>;
  delete(id: string): Promise<void>;
}

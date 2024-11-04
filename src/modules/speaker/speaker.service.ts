import { ISpeakerRepository } from './speaker.interface';
import { SpeakerRepository } from './speaker.repository';
import { NewSpeaker, Speaker, UpdateSpeaker } from './speaker.types';

export class SpeakerService {
  private speakerRepository = new SpeakerRepository();

  constructor(speakerRepository: ISpeakerRepository) {
    this.speakerRepository = speakerRepository;
  }

  async isPhoneNumberTaken(phoneNumber: string): Promise<boolean> {
    const existingSpeaker = await this.speakerRepository.findByPhone(phoneNumber);
    return existingSpeaker !== null;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const existingSpeaker = await this.speakerRepository.findByEmail(email);
    return existingSpeaker !== null;
  }

  async createSpeaker(data: NewSpeaker): Promise<Speaker> {
    const { email, phone } = data;

    if (await this.isPhoneNumberTaken(phone)) {
      throw new Error('Email or phone number unavailable');
    }

    if (await this.isEmailTaken(email)) {
      throw new Error('Email or phone number unavailable');
    }

    return this.speakerRepository.create(data);
  }

  async getSpeakers(): Promise<Speaker[]> {
    return this.speakerRepository.findAll();
  }

  async getSpeakerById(id: string): Promise<Speaker | null> {
    return this.speakerRepository.findById(id);
  }

  async updateSpeaker(id: string, data: UpdateSpeaker): Promise<Speaker | null> {
    return this.speakerRepository.update(id, data);
  }

  async deleteSpeaker(id: string): Promise<void> {
    await this.speakerRepository.delete(id);
  }
}

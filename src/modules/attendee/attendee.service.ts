import { IAttendeeRepository } from './attendee.interface';
import { AttendeeRepository } from './attendee.repository';
import { NewAttendee, Attendee, UpdateAttendee } from './attendee.types';
import { generateRandomId } from '../utils/utils';

export class AttendeeService {
  private attendeeRepository = new AttendeeRepository();

  constructor(attendeeRepository: IAttendeeRepository) {
    this.attendeeRepository = attendeeRepository;
  }

  async isPhoneNumberTaken(phone: string): Promise<boolean> {
    const existingAttendee = await this.attendeeRepository.findByPhone(phone);
    return existingAttendee !== null;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const existingAttendee = await this.attendeeRepository.findByEmail(email);
    return existingAttendee !== null;
  }

  async createAttendee(data: NewAttendee): Promise<Attendee> {
    const { email, phone } = data;

    if (await this.isPhoneNumberTaken(phone as string)) {
      throw new Error('Email or phone number unavailable');
    }

    if (await this.isEmailTaken(email)) {
      throw new Error('Email or phone number unavailable');
    }

    return this.attendeeRepository.create({ ...data, registrationId: generateRandomId(10).toString().toUpperCase() });
  }

  async getAttendees(): Promise<Attendee[]> {
    return this.attendeeRepository.findAll();
  }

  async getAttendeeById(id: string): Promise<Attendee | null> {
    return this.attendeeRepository.findById(id);
  }

  async updateAttendee(id: string, data: UpdateAttendee): Promise<Attendee | null> {
    return this.attendeeRepository.update(id, data);
  }

  async deleteAttendee(id: string): Promise<void> {
    await this.attendeeRepository.delete(id);
  }
}

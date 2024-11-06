import bcrypt from 'bcryptjs';
import { AttendeeRepository } from './attendee.repository';
import { NewAttendee, Attendee, UpdateAttendee } from './attendee.types';
import { generateRandomId } from '../utils/';

export class AttendeeService {
  private attendeeRepository = new AttendeeRepository();

  async isPhoneNumberTaken(phone: string): Promise<boolean> {
    const existingAttendee = await this.attendeeRepository.findByPhone(phone);
    return existingAttendee !== null;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const existingAttendee = await this.attendeeRepository.findByEmail(email);
    return existingAttendee !== null;
  }

  async createAttendee(data: NewAttendee): Promise<Attendee> {
    const { email, phone, password } = data;

    if (await this.isPhoneNumberTaken(phone as string)) {
      throw new Error('Email or phone number already taken');
    }

    if (await this.isEmailTaken(email)) {
      throw new Error('Email or phone number already taken');
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 8);
    return this.attendeeRepository.create({
      ...data,
      password: hashedPassword,
      registrationId: generateRandomId(12).toString().toUpperCase(),
    });
  }

  async getAttendees(): Promise<Attendee[]> {
    return this.attendeeRepository.findAll();
  }

  async getAttendeeById(id: string): Promise<Attendee | null> {
    return this.attendeeRepository.findById(id);
  }

  async getAttendeeByEmail(email: string): Promise<Attendee | null> {
    return this.attendeeRepository.findByEmail(email);
  }

  async updateAttendee(id: string, data: UpdateAttendee): Promise<Attendee | null> {
    return this.attendeeRepository.update(id, data);
  }

  async deleteAttendee(id: string): Promise<void> {
    await this.attendeeRepository.delete(id);
  }
}

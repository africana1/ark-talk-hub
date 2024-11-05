import { IAdminRepository } from './admin.interface';
import { AdminRepository } from './admin.repository';
import { NewAdmin, Admin, UpdateAdmin } from './admin.types';
import { generateRandomId } from '../utils/utils';

export class AdminService {
  private adminRepository = new AdminRepository();

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const existingAdmin = await this.adminRepository.findByEmail(email);
    return existingAdmin !== null;
  }

  async createAdmin(data: NewAdmin): Promise<Admin> {
    const { email } = data;

    if (await this.isEmailTaken(email)) {
      throw new Error('Email already taken');
    }

    return this.adminRepository.create(data);
  }

  async getAdmins(): Promise<Admin[]> {
    return this.adminRepository.findAll();
  }

  async getAdminById(id: string): Promise<Admin | null> {
    return this.adminRepository.findById(id);
  }

  async updateAdmin(id: string, data: UpdateAdmin): Promise<Admin | null> {
    return this.adminRepository.update(id, data);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminRepository.delete(id);
  }
}

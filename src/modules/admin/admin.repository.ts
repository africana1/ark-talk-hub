import { PrismaClient, Admin as AdminModel } from '@prisma/client';
import { IAdminRepository } from './admin.interface';
import { NewAdmin, Admin, UpdateAdmin } from './admin.types';

const { admin } = new PrismaClient();

export class AdminRepository implements IAdminRepository {
  async create(data: NewAdmin): Promise<Admin> {
    return admin.create({ data });
  }

  async findAll(): Promise<Admin[]> {
    return admin.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: false,
      },
    });
  }

  async findById(id: string): Promise<Admin | null> {
    return admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: false,
      },
    });
  }

  async findByEmail(email: string): Promise<AdminModel | null> {
    return admin.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: UpdateAdmin): Promise<Admin | null> {
    return admin.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await admin.delete({
      where: { id },
    });
  }
}

import { NewAdmin, Admin, UpdateAdmin } from './admin.types';

export interface IAdminRepository {
  create(data: NewAdmin): Promise<Admin>;
  findAll(): Promise<Admin[]>;
  findById(id: string): Promise<Admin | null>;
  findByEmail(email: string): Promise<Admin | null>;
  update(id: string, data: UpdateAdmin): Promise<Admin | null>;
  delete(id: string): Promise<void>;
}

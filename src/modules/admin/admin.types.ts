import { Admin as AdminModel } from '@prisma/client';

export type NewAdmin = Omit<AdminModel, 'id' | 'createdAt' | 'updatedAt'>;

export type Admin = Omit<AdminModel, 'password'>;

export type UpdateAdmin = Partial<AdminModel>;

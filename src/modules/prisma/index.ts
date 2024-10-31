import { PrismaClient } from '@prisma/client';

export const { speakers, talks, attendees } = new PrismaClient();

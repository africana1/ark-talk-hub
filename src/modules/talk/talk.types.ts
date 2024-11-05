import { Talk as TalkModel } from '@prisma/client';

export type NewTalk = Omit<TalkModel, 'id' | 'createdAt' | 'updatedAt'>;

export type Talk = Omit<TalkModel, ''>;

export type UpdateTalk = Partial<TalkModel>;

import { AppliedTalk as AppliedTalkModel } from '@prisma/client';

export type NewAppliedTalk = Omit<AppliedTalkModel, 'id' | 'createdAt' | 'updatedAt'>;

export type AppliedTalk = Omit<AppliedTalkModel, ''>;

export type UpdateAppliedTalk = Partial<AppliedTalkModel>;

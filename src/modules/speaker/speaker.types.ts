import { Speaker as SpeakerModel } from '@prisma/client';

// Define a type for creating a new speaker, omitting fields that are auto-generated
export type NewSpeaker = Omit<SpeakerModel, 'id' | 'createdAt' | 'updatedAt'>;

// Type for a Speaker without the password field
export type Speaker = Omit<SpeakerModel, 'password'>;

// Define a type for updating a speaker, making all fields optional
export type UpdateSpeaker = Partial<SpeakerModel>;

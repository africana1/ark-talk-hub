import Joi from 'joi';
import { uuid } from '../validation';
import { Speaker, NewSpeaker, UpdateSpeaker } from './speaker.types';

export const createSpeaker = {
  body: Joi.object<NewSpeaker>().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }),
};

export const getSpeakers = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getSpeaker = {
  params: Joi.object<Speaker>().keys({
    id: Joi.string().custom(uuid),
  }),
};

export const updateSpeaker = {
  params: Joi.object<Speaker>().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      phoneNumber: Joi.string(),
    })
    .min(1),
};

export const deleteSpeaker = {
  params: Joi.object<UpdateSpeaker>().keys({
    id: Joi.string().custom(uuid),
  }),
};

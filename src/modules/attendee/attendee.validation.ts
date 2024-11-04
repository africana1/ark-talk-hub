import Joi from 'joi';
import { uuid } from '../validation';
import { Attendee, NewAttendee, UpdateAttendee } from './attendee.types';

export const createAttendee = {
  body: Joi.object<NewAttendee>().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

export const getAttendees = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getAttendee = {
  params: Joi.object<Attendee>().keys({
    id: Joi.string().custom(uuid),
  }),
};

export const updateAttendee = {
  params: Joi.object<Attendee>().keys({
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

export const deleteAttendee = {
  params: Joi.object<UpdateAttendee>().keys({
    id: Joi.string().custom(uuid),
  }),
};

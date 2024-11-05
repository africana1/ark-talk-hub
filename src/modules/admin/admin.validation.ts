import Joi from 'joi';
import { uuid } from '../validation';
import { Admin, NewAdmin, UpdateAdmin } from './admin.types';

export const createAdmin = {
  body: Joi.object<NewAdmin>().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const getAdmins = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getAdmin = {
  params: Joi.object<Admin>().keys({
    id: Joi.string().custom(uuid),
  }),
};

export const updateAdmin = {
  params: Joi.object<Admin>().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
    })
    .min(1),
};

export const deleteAdmin = {
  params: Joi.object<UpdateAdmin>().keys({
    id: Joi.string().custom(uuid),
  }),
};

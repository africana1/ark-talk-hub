import Joi from 'joi';
import { uuid } from '../validation';
import { AppliedTalk, UpdateAppliedTalk } from './applied-talk.types';

export interface NewAppliedTalk {
  talkId: string;
  attendeeId: string;
}

export const createAppliedTalk = {
  body: Joi.object<NewAppliedTalk>().keys({
    talkId: Joi.string().required(),
    attendeeId: Joi.string().required(),
  }),
};

export const getAppliedTalks = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getAppliedTalk = {
  params: Joi.object<AppliedTalk>().keys({
    id: Joi.string().custom(uuid),
  }),
};

export const updateAppliedTalk = {
  params: Joi.object<AppliedTalk>().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      talkId: Joi.string().required(),
      attendeeId: Joi.string().required(),
    })
    .min(1),
};

export const deleteAppliedTalk = {
  params: Joi.object<UpdateAppliedTalk>().keys({
    id: Joi.string().custom(uuid),
  }),
};

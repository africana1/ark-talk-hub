import Joi from 'joi';
import { uuid } from '../validation';
import { Talk, UpdateTalk } from './talk.types';

export interface NewTalk {
  topicTitle: string;
  date: Date;
  time: string;
  location: string;
  speaker: string;
}

export const createTalk = {
  body: Joi.object<NewTalk>().keys({
    topicTitle: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    location: Joi.string().required(),
    speaker: Joi.string().required(),
  }),
};

export const getTalks = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getTalk = {
  params: Joi.object<Talk>().keys({
    id: Joi.string().custom(uuid),
  }),
};

export const updateTalk = {
  params: Joi.object<Talk>().keys({
    id: Joi.required().custom(uuid),
  }),
  body: Joi.object()
    .keys({
      topicTitle: Joi.string(),
      date: Joi.date(),
      time: Joi.string(),
      location: Joi.string(),
      speaker: Joi.string(),
    })
    .min(1),
};

export const deleteTalk = {
  params: Joi.object<UpdateTalk>().keys({
    id: Joi.string().custom(uuid),
  }),
};

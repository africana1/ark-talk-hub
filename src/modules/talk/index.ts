import { Talk, NewTalk, UpdateTalk } from './talk.types';
import { ITalkRepository } from './talk.interface';
import { TalkRepository } from './talk.repository';
import { TalkService } from './talk.service';
import * as talkController from './talk.controller';
import * as talkValidation from './talk.validation';
import talkRoute from './talk.route';

export {
  Talk,
  NewTalk,
  UpdateTalk,
  ITalkRepository,
  TalkRepository,
  TalkService,
  talkController,
  talkRoute,
  talkValidation,
};

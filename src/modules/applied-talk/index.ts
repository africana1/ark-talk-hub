import { AppliedTalk, NewAppliedTalk, UpdateAppliedTalk } from './applied-talk.types';
import { IAppliedTalkRepository } from './applied-talk.interface';
import { AppliedTalkRepository } from './applied-talk.repository';
import { AppliedTalkService } from './applied-talk.service';
import * as appliedTalkController from './applied-talk.controller';
import * as appliedTalkValidation from './applied-talk.validation';
import appliedTalkRoute from './applied-talk.route';

export {
  AppliedTalk,
  NewAppliedTalk,
  UpdateAppliedTalk,
  IAppliedTalkRepository,
  AppliedTalkRepository,
  AppliedTalkService,
  appliedTalkController,
  appliedTalkRoute,
  appliedTalkValidation,
};

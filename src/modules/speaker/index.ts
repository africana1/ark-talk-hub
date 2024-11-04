import { Speaker, NewSpeaker, UpdateSpeaker } from './speaker.types';
import { ISpeakerRepository } from './speaker.interface';
import { SpeakerRepository } from './speaker.repository';
import { SpeakerService } from './speaker.service';
import * as speakerController from './speaker.controller';
import speakerRoute from './speaker.route';
//import * as speakerValidation from './speaker.validation';

export {
  Speaker,
  NewSpeaker,
  UpdateSpeaker,
  ISpeakerRepository,
  SpeakerRepository,
  SpeakerService,
  speakerController,
  speakerRoute,
  //speakerValidation,
};

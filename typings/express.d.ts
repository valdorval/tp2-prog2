import { ActivityModel } from '../src/model/activitymodel';
import { ParticipantEventModel } from '../src/model/participanteventmodel';

declare global {
     module Express {
          interface Request {
               activity: ActivityModel;
          }
     }
}

declare global {
     module Express {
          interface Request {
               participant: ParticipantEventModel;
          }
     }
}

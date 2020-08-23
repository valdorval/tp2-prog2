import { EventModel } from '../src/model/eventmodel';

declare global {
     module Express {
          interface Request {
               event: EventModel;
          }
     }
}

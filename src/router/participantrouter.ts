import { Router } from 'express';
import { ParticipantEventModel } from '../model/participanteventmodel';
import { wrap } from '../util';

const participantRouter = Router();

const participantMap = new Map<number, ParticipantEventModel>();

participantMap.set(1, { participantsName: [{ 'name': 'Mathéo', 'participantId': 1 }, { 'name': 'Laura', 'participantId': 2 }], participantEventId: 1 });
participantMap.set(2, { participantsName: [{ 'name': 'Lico', 'participantId': 3 }, { 'name': 'Irène', 'participantId': 4 }], participantEventId: 2 });
participantMap.set(3, { participantsName: [{ 'name': 'Blanche', 'participantId': 5 }, { 'name': 'Myrtille', 'participantId': 6 }, { 'name': 'Rosie', 'participantId': 7 }], participantEventId: 3 });

// let nextparticipantId = 8;

// activityRouter.use('/:activityId', wrap(async (req, res, next) => {
//      const activity = activityMap.get(parseInt(req.params.activityId));
//      if (activity === undefined) { return res.sendStatus(404); }
//      req.activity = activity;
//      return next();
//  }));


participantRouter.use('/:participantId', wrap(async (req, res, next) => {
     const participant = participantMap.get(parseInt(req.params.participantId));
     if (participant === undefined) { return res.sendStatus(404); }
     req.participant = participant;
     return next();
}));

participantRouter.get('/', wrap(async (req, res) => {
     const participants = Array.from(participantMap.values());
     participants.forEach(element => {
          if (element.participantEventId !== req.activity.activityId) {
               console.log('error');
          }
          return res.send(element.participantsName);
     });
}));

participantRouter.get('/:participantId', wrap(async (req, res) => {
     console.log(req.params.name);
     return res.send(req.participant);
}));

// participantRouter.get('/', wrap(async (req, res) => {
//      const participants = Array.from(participantMap.values());
//      participants.forEach(element => {
//           if (element.participantId !== req.activity.activityId) {
//                console.log('error');
//           }
//           return res.send(element.participant);
//      });
// }));



// participantRouter.get('/', wrap(async (req, res) => {
//      if (req.activity.activityId !== req.participant.participantId) {
//           return res.sendStatus(404);
//      }
//      return res.send(req.participant);
// }));


/*
activityRouter.get('/:activityId', wrap(async (req, res) => {
     return res.send(req.activity);
}));

activityRouter.post('/', wrap(async (req, res) => {
     const activity: ActivityModel = req.body;
     activity.activityId = nextActivityId++;
     activity.date = new Date;
     activityMap.set(activity.activityId, activity);
     return res.send(activity);
}));

activityRouter.put('/:activityId', wrap(async (req, res) => {
     const updateActivity: ActivityModel = req.body;
     req.activity.name = updateActivity.name;
     return res.send(req.activity);
}));

activityRouter.delete('/:activityId', wrap(async (req, res) => {
     activityMap.delete(req.activity.activityId);
     return res.sendStatus(204);
}));
*/
export { participantRouter };

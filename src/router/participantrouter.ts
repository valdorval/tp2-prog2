import { Router } from 'express';
import { ParticipantModel } from '../model/participantmodel';
import { wrap } from '../util';

const participantRouter = Router();

const participantMap = new Map<number, ParticipantModel>();

participantMap.set(1, { participant: ['Mathéo', 'Laura'], participantId: 1 });
participantMap.set(2, { participant: ['Lico', 'Irène'], participantId: 2 });
participantMap.set(3, { participant: ['Blanche', 'Myrtille', 'DVa'], participantId: 3 });

// let nextActivityId = 4;

// activityRouter.use('/:activityId', wrap(async (req, res, next) => {
//      const activity = activityMap.get(parseInt(req.params.eventId));
//      if (activity === undefined) { return res.sendStatus(404); }
//      req.activity = activity;
//      return next();
// }));

participantRouter.get('/', wrap(async (_req, res) => {
     const participants = Array.from(participantMap.values());
     return res.send(participants);
}));


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

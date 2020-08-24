import { Router } from 'express';
import { ActivityModel } from '../model/activitymodel';
import { wrap } from '../util';

const activityRouter = Router();

const activityMap = new Map<number, ActivityModel>();

activityMap.set(1, { name: 'Lancé de patates en équipe de 3', activityId: 1, date: new Date });
activityMap.set(2, { name: 'Épluchette de blé d\'inde en forêt', activityId: 2, date: new Date });
activityMap.set(3, { name: 'Randonnée en montagne pied nu', activityId: 3, date: new Date });

let nextActivityId = 4;

activityRouter.use('/:activityId', wrap(async (req, res, next) => {
    const activity = activityMap.get(parseInt(req.params.eventId));
    if (activity === undefined) { return res.sendStatus(404); }
    req.activity = activity;
    return next();
}));

activityRouter.get('/', wrap(async (_req, res) => {
    const activities = Array.from(activityMap.values());
    return res.send(activities);
}));

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
    req.activity.date = updateActivity.date;
    return res.send(req.activity);
}));

activityRouter.delete('/:activityId', wrap(async (req, res) => {
    activityMap.delete(req.activity.activityId);
    return res.sendStatus(204);
}));

export { activityRouter };

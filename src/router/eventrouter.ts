import { Router } from 'express';
import { EventModel } from '../model/eventmodel';
import { wrap } from '../util';

const eventRouter = Router();

const eventMap = new Map<number, EventModel>();

eventMap.set(1, { name: 'Lancé de patates en équipe de 3', eventId: 1, date: new Date });
eventMap.set(2, { name: 'Épluchette de blé d\'inde en forêt', eventId: 2, date: new Date });
eventMap.set(3, { name: 'Randonnée en montagne nu pied', eventId: 3, date: new Date });

let nextEventId = 4;

eventRouter.use('/:eventId', wrap(async (req, res, next) => {
    const event = eventMap.get(parseInt(req.params.eventId));
    if (event === undefined) { return res.sendStatus(404); }
    req.event = event;
    return next();
}));

eventRouter.get('/', wrap(async (_req, res) => {
    const events = Array.from(eventMap.values());
    return res.send(events);
}));

eventRouter.get('/:eventId', wrap(async (req, res) => {
    return res.send(req.event);
}));

eventRouter.post('/', wrap(async (req, res) => {
    const event: EventModel = req.body;
    event.eventId = nextEventId++;
    event.date = new Date;
    eventMap.set(event.eventId, event);
    return res.send(event);
}));

eventRouter.put('/:eventId', wrap(async (req, res) => {
    const updateEvent: EventModel = req.body;
    req.event.name = updateEvent.name;
    return res.send(req.event);
}));

eventRouter.delete('/:eventId', wrap(async (req, res) => {
    eventMap.delete(req.event.eventId);
    return res.sendStatus(204);
}));

export { eventRouter };

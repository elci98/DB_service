import { Router } from 'express';
import { SoldiersRouter } from './soldiers.routes';
import { tasksRouter } from './tasks.routes';
import { listsRouter } from './lists.routes';

export const DBrouter = Router();

DBrouter.use('/soldiers', SoldiersRouter);
DBrouter.use('/tasks', tasksRouter);
DBrouter.use('/lists', listsRouter);
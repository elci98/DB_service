import { ObjectId } from 'mongodb';
import Joi = require('joi');
import Task, { TaskWithIdSchema } from './task';

export default class Soldier {
	constructor(
    public name: string,
    public task?: Task,
    public id?: ObjectId
	) {}
}

export const SoldierPutSchema = Joi.object({
	name: Joi.string().required(),
});

export const SoldierPostSchema = Joi.object({
	name: Joi.string().required(),
	task: TaskWithIdSchema
});

import * as Joi from 'joi';
import { ObjectId } from 'mongodb';

export default class Task {
	constructor(
      public name: string,
      public id?: ObjectId
	) {}
}

export const TaskWithoutIdSchema = Joi.object({
	name: Joi.string().required(),
});

export const objectId = Joi.object({
	_id: Joi.string().required(),
});
  
export const TaskWithIdSchema = Joi.object({
	name: Joi.string().required(),
	id: objectId.required(),
});

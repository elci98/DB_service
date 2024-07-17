import { Router } from 'express';
import * as Dal from 'mongodb-generic-dal';
import List from '../models/list';
import { createValidator } from 'express-joi-validation';
import { SoldierPutSchema, SoldierPostSchema } from '../models/soldier';


export const listsRouter = Router();

const validator = createValidator();
const collectionName = process.env.LISTS_COLLECTION_NAME;

listsRouter.get('/', async (req, res) => {
	console.log('[server]: Server recieved /list GET request');

	try {
		const _id = req.query['id'];
		const result = await Dal.getBy<List>(collectionName, {_id}    , {});
		return result.length > 0
			? res.status(200).send(result)
			: res.status(404).send('[server]: list not found!');
	} catch (error) {
		res
			.status(500)
			.send(
				`[server]: cannot get list ${req.query['id']}, error: ${error.message}`
			);
	}
});

listsRouter.post('/', validator.body(SoldierPostSchema), async (req, res) => {
	console.log('[server]: Server recieved /list POST request');

	try {
		const _id = req.query['id'];
		const list: List = JSON.parse(JSON.stringify(req.body));
		const result = await Dal.create<List>(collectionName, {
			...list,
			_id,
		});
		return result
			? res.status(201).send(`[server]: list ${_id} saved successfully`)
			: res.status(404).send('[server]: list not found!');
	} catch (error) {
		res
			.status(500)
			.send(
				`[server]: list ${req.query['id']} did not saved, error: ${error.message}`
			);
	}
});

listsRouter.put('/', validator.body(SoldierPutSchema), async (req, res) => {
	console.log('[server]: Server recieved /list PUT request');

	try {
		const _id = req.query['id'];
		const list: List = JSON.parse(JSON.stringify(req.body));
		const result = await Dal.createOrUpdate<List>(
			collectionName,
			{_id },
			list
		);

		return result
			? res
				.status(200)
				.send(`[server]: list ${_id} updated successfully`)
			: res.status(404).send('[server]: list not found!');
	} catch (error) {
		res
			.status(500)
			.send(
				`[server]: list ${req.query['id']} did not updated, error: ${error.message}`
			);
	}
});

listsRouter.delete('/', async (req, res) => {
	console.log('[server]: Server recieved /list DELETE request');
	try {
		const _id = req.query['id'];
		//try to remove list
		const result = await Dal.remove<List>(collectionName, { _id });

		return result
			? res
				.status(200)
				.send(`[server]: list ${_id} updated successfully`)
			: res.status(404).send('[server]: list not found!');
	} catch (error) {
		res
			.status(500)
			.send(
				`[server]: cannot delet list ${req.query['id']}, error: ${error.message}`
			);
	}
});

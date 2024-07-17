import * as Dal from 'mongodb-generic-dal';
import Soldier, { SoldierPostSchema } from '../models/soldier';
import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

export const SoldiersRouter = Router();

const collectionName = process.env.SOLDIERS_COLLECTION_NAME;
const validator = createValidator();

SoldiersRouter.get('/', async (req, res)=>{
	console.log('Server recieved /soldier GET request');
	try {

		const _id = req.query['id'];
		const result = await Dal.getBy<Soldier>(collectionName, {_id}, {});
		return result.length > 0 ? 
			res.status(200).send(result) :
			res.status(404).send(`soldier ${_id} not found!`);
	} catch (error) {
		res.status(500).send(`cannot get soldier ${req.query['id']}, error: ${error.message}`);
	}
});

SoldiersRouter.post('/', validator.body(SoldierPostSchema), async (req, res)=>{
	console.log('Server recieved /soldier POST request');
    
	try {
		const _id = req.query['id'];
		const soldier:Soldier = JSON.parse(JSON.stringify(req.body));
		const result = await Dal.create<Soldier>(collectionName, { ...soldier, _id });
		return result ? 
			res.status(201).send(`soldier ${_id} saved successfully`) :
			res.status(404).send(`soldier ${_id} not found!`);
        
	} catch (error) {
		res.status(500).send(`soldier ${req.query['id']} did not saved, error: ${error.message}`);
	}
});

SoldiersRouter.put('/',  async (req, res)=>{
	console.log('Server recieved /soldier PUT request');
    
	try {
		const _id = req.query['id'];
		const soldier:Soldier = JSON.parse(JSON.stringify(req.body));
		const result = await Dal.createOrUpdate<Soldier>(collectionName, { _id }, soldier);
        
		return result ? 
			res.status(200).send(`soldier ${_id} updated successfully`):
			res.status(404).send(`soldier ${_id} not found!`);
	} catch (error) {
		res.status(500).send(`soldier ${req.query['id']} did not updated, error: ${error.message}`);
	}
});

SoldiersRouter.delete('/', async (req, res)=>{
	console.log('Server recieved /soldier DELETE request');
    
	try {
		const _id = req.query['id'];
		//try to remove soldier
		const result = await Dal.remove<Soldier>(collectionName, {_id });
        
		return result ? 
			res.status(202).send(`soldier ${_id} deleted successfully`):
			res.status(404).send(`soldier ${_id} not found!`);
	} catch (error) {
		res.status(500).send(`cannot delete soldier ${req.query['id']}, error: ${error.message}`);
	}

});
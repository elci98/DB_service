import { Router } from 'express';
import * as Dal from 'mongodb-generic-dal';
import Soldier from '../models/soldier';
// import { createValidator } from 'express-joi-validation';


export const authRouter = Router();

// const validator = createValidator();
const collectionName = process.env.SOLDIERS_COLLECTION_NAME;


authRouter.post('/login/google', async (req, res) => {
	console.log('[server]: Server recieved /auth/login/google POST request');
    
	try {
		const _id = req.query['id']; 
		const user = JSON.parse(JSON.stringify(req.body));
		const result = await Dal.createOrUpdate<Soldier>(collectionName,{username: user.username}, user);
		return result
			? res.status(201).send({message: `user ${_id} logged in successfully`})
			: res.status(404).send('user not found!');
	} catch (error) {
		res.status(500).send(`${req.query['id']} did not saved, error: ${error.message}`);
		console.log('[server]: Server failure ', error.message);
	}
});

authRouter.post('/register', async (req, res)=>{
	try {
		
		console.log('[server]: Server recieved /auth/register POST request');
		const user = JSON.parse(JSON.stringify(req.body));
		const result = await Dal.create<Soldier>(collectionName, user);
		return result ? res.status(201).send({message: `[server]: user ${user._id} saved successfully`}) :
			res.status(404).send('save failure');
	} catch (error) {
		res.status(500).send(`[server]: register ${req.query['id']} failed, error: ${error.message}`);
		console.log('[server]: Server failure ', error.message);
	}
	
});

authRouter.post('/login', async (req, res)=>{
	try {
		console.log('[server]: Server recieved /auth/login POST request');
		const username = req.body;
		const result = await Dal.getBy<Soldier>(collectionName, username, {username:-1});
		console.log(`[server]:  response from db server: ${result}`);
		return result.length > 0 ? res.status(200).send(result[0])
			: res.status(404).send('user not found');
		
	} catch (error) {
		res.status(500).send(`[server]: login ${req.query['id']} failed, error: ${error.message}`);
		console.log('[server]: Server failure ', error.message);
		
	}
        
});


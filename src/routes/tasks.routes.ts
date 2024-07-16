import { Router } from 'express';
import * as Dal from "mongodb-generic-dal";
import Task, { TaskWithoutIdSchema } from '../models/task';
import {  } from 'mongodb';
export const tasksRouter = Router();

import { createValidator } from 'express-joi-validation';


const validator = createValidator();


const collectionName = process.env.TASKS_COLLECTION_NAME;


tasksRouter.get('/', async (req, res)=>{
    console.log("Server recieved /tasks GET request");

    try {
        const _id = req.query['id']
        const result = await Dal.getBy<Task>(collectionName, { _id }, {});
        return result.length > 0 ? 
        res.status(200).send(result) :
        res.status(404).send(`task ${_id} not found!`);
    } catch (error) {
        res.status(500).send(`cannot get task ${req.query['id']}, error: ${error.message}`)
    }
})

tasksRouter.post('/', validator.body(TaskWithoutIdSchema), async(req, res)=>{
    console.log("Server recieved /task POST request");
    
    try {
        const _id = req.query['id']
        const task:Task = JSON.parse(JSON.stringify(req.body))
        const result = await Dal.create<Task>(collectionName, {...task, _id });
        return result ? 
            res.status(201).send(`task ${_id} saved successfully`) :
            res.status(404).send(`task ${_id} not found!`);

    } catch (error) {
        res.status(500).send(`task ${req.query['id']} did not saved, error: ${error.message}`)
    }
})

tasksRouter.put('/', validator.body(TaskWithoutIdSchema), async (req, res)=>{
    console.log("Server recieved /task PUT request");
    
    try {
        const _id = req.query['id'];
        const task:Task = JSON.parse(JSON.stringify(req.body));
        const result = await Dal.createOrUpdate<Task>(collectionName, { _id }, task);

        return result ? 
        res.status(200).send(`task ${_id} updated successfully`):
        res.status(404).send(`task ${_id} not found!`);
    } catch (error) {
        res.status(500).send(`task ${req.query['id']} did not updated, error: ${error.message}`)
    }
})

tasksRouter.delete('/', async (req, res)=>{
    console.log("Server recieved /task DELETE request");
    try {
        const _id = req.query['id'];
        //try to remove task
        const result = await Dal.remove<Task>(collectionName, { _id });
        
        return result ? 
        res.status(202).send(`task ${_id} deleted successfully`):
        res.status(404).send(`task ${_id} not found!`);
    } catch (error) {
        res.status(500).send(`cannot delet task ${req.query['id']}, error: ${error.message}`)
    }

})
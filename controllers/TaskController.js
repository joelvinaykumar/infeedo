const TaskService = require('../services/TaskService');
const Joi = require('joi')
const express = require("express");
const taskRouter = express.Router();
const validator = require('express-joi-validation').createValidator({})
const { statusCode } = require('../utils/constants')

const taskService = new TaskService()

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid(...statusCode).optional(),
})

const taskQuerySchema = Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
})

const taskMetricSchema = Joi.object({
    date: Joi.string().optional(),
})

class TaskController {

    async create(req, res) {
        try {
            const response = await taskService.createTask(req.body)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const response = await taskService.updateTask(id, req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    }

    async getAll(req, res) {
        try {
            const response = await taskService.getAll(req.query)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    }

    async getAllMetrics(req, res) {
        try {
            const response = await taskService.getAllMetrics(req.query)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    }
}

taskRouter.post('/', validator.body(taskSchema), new TaskController().create)
taskRouter.patch('/:id', validator.body(taskSchema), new TaskController().update)
taskRouter.get('/', validator.query(taskQuerySchema), new TaskController().getAll)
taskRouter.get('/metrics', validator.query(taskMetricSchema), new TaskController().getAllMetrics)

module.exports = taskRouter
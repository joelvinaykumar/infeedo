const { PrismaClient } = require('@prisma/client')
const { months } = require('../utils/constants')
const prisma = new PrismaClient()

class TaskService {

    async createTask(data) {
        try {
            const res = await prisma.tasks.create({ data })
            return res
        } catch (error) {
            return error.message
        }
    }

    async updateTask(id, data) {
        try {
            const res = await prisma.tasks.update({ id, data })
            return res
        } catch (error) {
            return error.message
        }
    }

    async getAll(query) {
        try {
            const page = query.page || 1
            const limit = query.limit || 10

            const res = await prisma.tasks.findMany({ skip: (page-1)*limit, take: limit })
            return res
        } catch (error) {
            return error.message
        }
    }

    async getAllMetrics(query) {
        try {
            let metricPromises = []
            const year = new Date().getFullYear()
            for(let i=0; i<12; i++) {
                metricPromises.push([
                    `${months[i]} ${year}`,
                    await prisma.tasks.count({
                        where: {
                            status: "open",
                            createdAt: { gte: new Date(`${year}-${i+1}-${1}`), lte: new Date(`${year}-${i+1}-${31}`) }
                        },
                    }),
                    await prisma.tasks.count({
                        where: {
                            status: "in_progress",
                            createdAt: { gte: new Date(`${year}-${i+1}-${1}`), lte: new Date(`${year}-${i+1}-${31}`) }
                        },
                    }),
                    await prisma.tasks.count({
                        where: {
                            status: "completed",
                            createdAt: { gte: new Date(`${year}-${i+1}-${1}`), lte: new Date(`${year}-${i+1}-${31}`) }
                        },
                    })
                ])
            }
            const res = await Promise.all(metricPromises)
            return res.map(metric => ({
                date: metric[0],
                metric: {
                    open_tasks: metric[1],
                    inprogress_tasks: metric[2],
                    completed_tasks: metric[3],
                }
            }))
        } catch (error) {
            return error.message
        }
    }
}

module.exports = TaskService
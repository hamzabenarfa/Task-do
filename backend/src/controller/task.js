const { PrismaClient } = require('@prisma/client');
const { parse } = require('date-fns');

const prisma = new PrismaClient();

createTask = async (userId, taskData) => { 
    try {
        const newTask = await prisma.task.create({
            data: {
                ...taskData,
                userId: userId,
            },
        });
        return newTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};


getAllTasks = async (userId) => {
    try {
        const tasks = await prisma.task.findMany(
            {
                where: {
                    userId: userId,
                },
            }
        );
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
}

deleteTask = async (taskId) => {
    try {
        const task = await prisma.task.delete({
            where: {
                id: parseInt(taskId),

            },
        });
        return task;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

updateTask = async (taskId, taskData) => {
    try {
        const task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                ...taskData,
            },
        });
        return task;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

module.exports = { createTask, getAllTasks ,deleteTask, updateTask };
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

createTask = async (taskData) => {
    try {
        const newTask = await prisma.task.create({
            data: taskData
        });
        return newTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

getTasks = async () => {
    try {
        const tasks = await prisma.task.findMany();
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
};

module.exports = {createTask, getTasks};
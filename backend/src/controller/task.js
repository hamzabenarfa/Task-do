const { PrismaClient } = require('@prisma/client');

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



module.exports = { createTask, getAllTasks  };
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

getAllTasks = async () => {
    try {
        const tasks = await prisma.task.findMany();
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
}

getTasks = async () => {
    try {
        const tasks = await prisma.task.findMany(
            {
                where: {
                    start_at :""
                }
            }
        );
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
};

getAppointments = async () => {
    try {
        const appointments = await prisma.task.findMany(
            {
                where: {
                    start_at : {not: ""}
                }
            }
        );
        return appointments;
    } catch (error) {
        console.error('Error getting appointments:', error);
        throw error;
    }
};


module.exports = {createTask,getAllTasks, getTasks,getAppointments};
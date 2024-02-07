const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

createAppointment = async (appointmentData) => {
    try {
        const newAppointment = await prisma.appointment.create({
            data: appointmentData
        });
        return newAppointment;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};


module.exports = createAppointment;
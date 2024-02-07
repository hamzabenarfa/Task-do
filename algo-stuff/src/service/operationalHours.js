const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

createOperationalHours = async (operationalHoursData) => {
    try {
        const newOperationalHours = await prisma.operationalHours.create({
            data: operationalHoursData
        });
        return newOperationalHours;
    } catch (error) {
        console.error('Error creating OperationalHours:', error);
        throw error;
    }
};


module.exports = createOperationalHours;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

createOperationalHours = async (operationalHoursData) => {
    try {
        const newOperationalHours = await prisma.operationalHours.create({
            data: {
                startingTime: operationalHoursData.startingTime,
                endingTime: operationalHoursData.endingTime,
                createdAt: new Date().toISOString().split('T')[0], 
            }
        });
        return newOperationalHours;
    } catch (error) {
        console.error('Error creating OperationalHours:', error);
        throw error;
    }
};

getTodaysOperationalHoursToday = async () => {
    try{
        const operationalHours = await prisma.operationalHours.findFirst(
            {
                where: {
                    createdAt: new Date().toISOString().split('T')[0], 
                }
            }
        );
        return operationalHours;
    }
    catch (error) {
        console.error('Error getting OperationalHours:', error);
        throw error;
    }
}


module.exports = {createOperationalHours,getTodaysOperationalHoursToday};
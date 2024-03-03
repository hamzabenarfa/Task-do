const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  

const createUser = async (userData) => {  
    try {
        const newUser = await prisma.user.create({
            data: userData
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};  

const getUserByEmail = async (userData) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        });
        
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

module.exports = {createUser , getUserByEmail};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

const createUser = async (userData) => {  
    const { password,...rest } = userData;
    try {
        const newUser = await prisma.user.create({
            data: {
                ...rest,
                password: await bcrypt.hash(password, 10)
            }
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};  

const getUser = async (userData) => {
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

module.exports = {createUser , getUser};
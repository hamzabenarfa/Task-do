const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { getUserByEmail } = require('./user');

const bcrypt = require('bcrypt');

const register = async (userData) => {  
    
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

const login = async (userData) => {
    try {
        if(!userData.email || !userData.password) {
            return { error: 'Email and password are required' };
        }

        const user = await getUserByEmail(userData);
        if(!user) {
            return { error: 'User not found' };
        }

        const match = await bcrypt.compare(userData.password, user.password);
        console.log("🚀 ~ login ~ match:", match)
        
        const { password, ...rest } = user;
        if(match) {
            return rest;
        }

        return { error: 'Invalid password' };
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

module.exports = {register , login};
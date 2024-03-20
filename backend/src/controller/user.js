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

const addImageProfile = async (req, res) => {
    const userId = req.user.id;
    const filename = req.file.filename;
    try {
        const newResource = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profileImage:filename
            }

        });
        res.status(201).json(newResource);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating resource' });
    }
}

module.exports = {createUser , getUserByEmail,addImageProfile};
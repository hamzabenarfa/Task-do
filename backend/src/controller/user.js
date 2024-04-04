const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  
const bcrypt = require('bcrypt');

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

const getUserById = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Error getting user' });
    }
}

const getProfileImage = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        res.status(200).json(user.profileImage);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Error getting user' });
    }
}

const addImageProfile = async (req, res) => {
    const userId = req.user.id;  
    if (!req.file) {
       return res.status(400).json({ error: 'No file uploaded' });
    }
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

const resetPassword = async (req, res) => {
    const userId = req.user.id;
    const { currentPassword,newPassword } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Current password is incorrect' });       
         }
     
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: await bcrypt.hash(newPassword, 10)
            }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
}

module.exports = {createUser , getUserByEmail,addImageProfile,getProfileImage,getUserById,resetPassword};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

const { getUserByEmail } = require('./user');

const register = async (userData) => {

    const { password, ...rest } = userData;
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

const login = asyncHandler(async (userData) => {
    try {
        if (!userData.email || !userData.password) {
            return { error: 'Email and password are required' };
        }

        const user = await getUserByEmail(userData);
        if (!user) {
            return { error: 'User not found' };
        }

        const match = await bcrypt.compare(userData.password, user.password);
        if (!match) {
            throw new Error('Invalid password'); // Throw error instead of returning object
        }

        const accessToken = jwt.sign(
            { user: { id: user.id } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "700m" }
        );

        return { accessToken };
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
});

module.exports = { register, login };
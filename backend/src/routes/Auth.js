const router = require('express').Router();
const {createUser , getUser} = require('../controller/user');

router.post('/register',async (req, response) => {
    const userData = req.body;
    try {
        const existingUser = await getUser(userData);
        if(existingUser) {
            response.status(400).json({ error: 'User already exists' });
            return;
        }
        if(!userData.email || !userData.password) {
            response.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const newUser = await createUser(userData);
        response.json(newUser);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error creating user' });
    }
});

router.post('/login',async (req, response) => {
    const userData = req.body;
    try {
        const user = await getUser(userData);
        response.json(user);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error getting user' });
    }
});

module.exports = router;

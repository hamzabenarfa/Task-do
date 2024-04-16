const router = require('express').Router();
const { getUserByEmail} = require('../controller/user');
const {register , login} = require('../controller/auth');

router.post('/register',async (req, response) => {
    const userData = req.body;
    try {
        if(!userData.email || !userData.password || !userData.name ) {
            return response.status(400).json({ error: 'Email , password and name are required' });        
        }
        const existingUser = await getUserByEmail(userData);
        if(existingUser) {
            return response.status(400).json({ error: 'User already exists' });
        }
        
        const result = await register(userData);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: 'Error creating user' });
    }
});

router.post('/login',async (req, response) => {
    const userData = req.body;
    try {
        const user = await login(userData);
        response.json(user);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error getting user' });
    }
});

module.exports = router;

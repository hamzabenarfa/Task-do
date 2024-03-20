const router = require('express').Router();
const multer = require('multer');

const {addImageProfile,getProfileImage} = require('../controller/user');
const multerConfig = require('../config/multer');

router.get('/get-profile-img', getProfileImage);

router.post('/upload-img-profile', multer(multerConfig).single('file'),  (req, res) => {
    try {    
       if (res.status(200)){
        addImageProfile(req, res)
       }  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }})


module.exports = router;
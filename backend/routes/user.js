const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate')


const { postUser, loginUser, logoutUser, getUserProfile } = require('../controllers/userController');


//routes
router.post('/signup', postUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser);
router.get('/profile', authenticateToken, getUserProfile);



module.exports = router;

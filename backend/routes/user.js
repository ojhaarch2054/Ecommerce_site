const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate')


const { postUser, loginUser, logoutUser } = require('../controllers/userController');


//routes
router.post('/', postUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser);




module.exports = router;

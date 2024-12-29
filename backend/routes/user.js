const express = require('express');
const router = express.Router();


const { postUser, loginUser } = require('../controllers/userController');


//routes
router.post('/', postUser);
router.post('/login', loginUser);




module.exports = router;

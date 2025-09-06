const express=require('express');
const { loginController, registerController, updateUserController } = require('../controllers/user-controller'); // Import updateUserController
const router=express();

//routers
//POST||LOGIN
router.post('/login',loginController)

// POST||REGISTER USER
router.post('/register',registerController)

// POST||UPDATE USER
router.post('/update-user', updateUserController); // New route for updating user

module.exports=router
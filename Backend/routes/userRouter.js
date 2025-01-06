const express=require('express')

const router=express.Router()
const {registerUser,loginUser, refreshToken, logoutUser, getLoggedInUser}=require('../controllers/userController')
const authenticate = require('../middlewares/authMiddleware')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/refreshtoken',refreshToken)
router.post('/logout',logoutUser)
router.get('/me',authenticate,getLoggedInUser)

module.exports=router
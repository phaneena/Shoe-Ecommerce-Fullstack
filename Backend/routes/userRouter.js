const express=require('express')

const router=express.Router()
const {registerUser,loginUser, refreshToken, logoutUser}=require('../controllers/userController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/refreshtoken',refreshToken)
router.post('/logout',logoutUser)

module.exports=router
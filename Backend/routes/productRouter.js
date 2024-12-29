const express=require('express')
const { getallProducts, singleProduct} = require('../controllers/productController')

const router=express.Router()


router.get('/getProducts',getallProducts)//getallproduct
router.get('/getProducts/:id',singleProduct) //get single


module.exports=router
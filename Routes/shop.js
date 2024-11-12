const express= require('express');

const shopController=require('../Controller/shop');

const router=express.Router();

router.get('/get-items', shopController.getProducts);

router.post('/add-item', shopController.addProduct);

router.get('/buy/:productId/:itemquantity', shopController.buyProducts);

module.exports=router;
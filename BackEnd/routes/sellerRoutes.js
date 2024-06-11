const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
 const User = require("../database/User");
// const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');


router.get('/products', Product.getOneProduct);
router.put('/products/:productId', Product.modifyProduct);
router.delete('/products/category/:category', Product.removeProduct);
router.post('/products/add',  Product.addProduct);

//JWT token


router.get('/:userid', User.getOneUser);
router.put('/:userid',  User.updateUser);

router.post('/add',Product.addProduct)
router.post('/signup', signUp);
router.post('/login', logIn);
module.exports = router;

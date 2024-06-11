const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require('../database/User');
const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');
const { checkAdminRole} = require('../MiddleWares/MiddleWares');

router.get('/products',Product.getAllproducts);
router.post('/products/add',Product.addProduct)
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category',Product.getByCategory)
router.put('/products/:productId', Product.modifyProduct);
router.delete('/products/:productId',Product.removeProduct)

//JWT token
router.get('/dashboard', checkAdminRole, (req, res) => {
  res.send('This is an admin-only route');

});
router.get('/orders', Order.getAllorders);
router.get('/orders/:orderId', Order.getOrder);
router.put('/orders/:orderId', Order.markOrder);
router.post('/orders/add', Order.addOrder);

  router.get('/users',User.getAllUsers);
  router.delete('/users/:userId',User.deleteUser)
  router.get('/users/:role', User.getUsersByRole);
  /////
  router.put('/users/switch/:userId', User.switchUserRole); 

/// just try 
router.post('/signup',signUp)
router.post('/login',logIn)
module.exports=router
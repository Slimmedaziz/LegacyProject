const crypto = require('crypto');
const db = require('../database/config');
const jwt = require("jsonwebtoken")
const protect = async (req, res,next) => {
  console.log(req);
  //1- check if the token already exist , if it is storeit
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }
  //2- verification
  const decoded = jwt.verify(token, 'your-jwt-secrets');
  console.log(decoded);

  //3- user checkings
  try {
    const currUser = await db.User.findByPk(decoded.id);
    if (!currUser) {
      return res.status(401).json({ error: 'User not found' });
    }
    next();
  } catch (error) {
    logger.error(`Error in token validation: ${error.message}`);
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

const validiSeller = (req, res, next) => {
  const { role, CIN } = req.body;
  if (role === 'Seller' && !CIN) {
    return res.status(400).json({ error: 'the CIN is a mandatory field' });
  }
  next();
};
const handleErrors = (res, error) => {
  console.error('Error :',error);
  res.status(500).json({ error: error.message });
};
const checkAdminRole = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE3OTYzNzUzLCJleHAiOjE3MjU3Mzk3NTN9');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied, admin only' });
    }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
// const forgotPassWord = async()=>{
// //1- getting the user email based on the post
// const user = await db.User.findOne({email:req.body.email})
// if (!user) {
//   return res.status(404).json({ error: 'User not found with given email ' });
// }
// //2- generate a randow new reset token
// const generateRandomToken = (length) => {
//   return crypto.randomBytes(length).toString('hex');
// };
// // generate a 25 character token
// const resetToken = generateRandomToken(25);
// console.log('Reset token:', resetToken);
// //3- send back that token to el user
// }

module.exports = { protect, handleErrors, checkAdminRole, validiSeller };

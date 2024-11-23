
const User = require('../models/userModel')


// Get all users
exports.getAllUsers = (req, res) => {

};

// Get user by ID
exports.getUserById = (req, res) => {

};

// Create or Update User
exports.createOrUpdateUser = async (req, res) => {
  try{
    const user = await User.create(req.body)
    res.status(201).json({
      status : 'User Created',
      data : {
        user
      }
    })
  }
  catch(err){
    res.status(400).json({
      status: 'Bad Request',
      error : err
    })
  }
};

// Delete User
exports.deleteUser = (req, res) => {

};

// Deposit Money


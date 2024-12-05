
const User = require('../models/userModel')


// Get all users
exports.getAllUsers = async (req, res) => {
try{
  const users = await User.find()
  res.status(200).json({success:true, users})
}catch(error){
  console.log('Error fetching users', error)
  res.status(500).json({success: false, message:'Error fetching users', error: error.message})
}
};

// Get user by ID
exports.getUserById = async(req, res) => {
const {id} = req.params
try{
  const user = await User.findById(id)
  if(!user){
    return res.status(404).json({message:'User not found'})
  }
  res.json(user)
}catch (error){
  console.log(error)
  res.status(500).json({message:'server error'})
}
};

// Create 
exports.create = async (req, res) => {
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

//updateUser
exports.updateUser = async(req, res) =>{
  const {id} = req.params
  const updates = req.body
  try{
    if(!updates || Object.keys(updates).length === 0){
      return res.status(400).json({message:'No fields to update provided'})
    }
    const user = await User.findByIdAndUpdate(id, updates, {new:true, runValidators:true})
    if(!user){
      return res.status(404).json({message:'user not found'})
    }
    res.json({message:'user updated successfully', user})
  }catch (error){
    console.log('Error updating user:',error)
    res.status(500).json({message:'server error', error:error.message})
  }
}

// Delete User
exports.deleteUser = async (req, res) => {
const {id} = req.params
try{
  const user = await User.findByIdAndDelete(id)
  if(!user){
    return res.status(404).json({message: 'user not found'})
  }
  res.status(200).json({message:'user successfully deleted'})
}catch(error){
  console.error(error)
  res.status(500).json({message:'server error'})
}
};

// Deposit Money


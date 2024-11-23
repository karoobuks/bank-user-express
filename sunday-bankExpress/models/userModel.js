const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'User first name is required']
    },
    lastName : {
        type: String,
        required: [true, 'user last name is required']
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
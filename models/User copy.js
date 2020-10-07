const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, '使用者名稱必填']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model('users', UserSchema)

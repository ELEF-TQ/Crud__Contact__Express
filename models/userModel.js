const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add the user name'],
  },
  email: {
    type: String,
    required: [true, 'Please add the email'],
  },
  password: {
    type: String,
    required: [true, 'Please add the user password'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email is already taken");
  }


  const hashedPassword = await bcrypt.hash(password , 10);
  const newUser = await User.create({ name, email, password : hashedPassword  });
  res.status(201).json({ message: 'Register done', user: newUser });
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required for login");
  }

  const user = await User.findOne({ email });

  if (user && ( await bcrypt.compare(password , user.password) )) {
    const accessToken = jwt.sign({
        user: {
            name: user.name,
            email: user.email,
            id:user.id,
        }
    }, process.env.ACCESS_TOKEN_SECRET ,
    {expiresIn : "1h"})
    res.status(200).json({ message: 'Login done', user , accessToken}); 
  }else {
    throw new Error("Invalid email or password");
  }

  
});


const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error("User not authenticated");
  }
  res.status(200).json({ user });
});







module.exports = { registerUser, loginUser, getCurrentUser };

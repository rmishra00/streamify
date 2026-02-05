const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user registration 
exports.register = async(req,res) =>{
  try{
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })
    res.status(201).json({message:"User registered successfully"})
  }catch(error){
    console.log("Register error: " , error)
    res.status(500).json({message:"Registration failed"}, error.message)
  }
}

exports.login = async(req, res)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      res.status(400).json({message: "Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(400).json({message:"Invalid credentials"});
    }
    const token = jwt.sign(
      {userId : user.id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    );
    res.status(200).json({
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    })
  }catch(error){
    res.status(500).json({message:"Login failed"})
  }
}

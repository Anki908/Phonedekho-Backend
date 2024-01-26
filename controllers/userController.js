const { User } = require("../model/user")
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.signUp = async (req , res) => {
    const oldUser = await User.findOne({email: req.body.email});
    if(oldUser) throw new Error('user already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);

    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(200).json({
        status: 'success',
        user,
    })
}

exports.signIn = async(req , res) => {

    if(!req.body.email || !req.body.password) throw new Error("please provide email and password");
    
    const user = await User.findOne({email: req.body.email});
    if(!user) throw new Error("user was not registered !.. please sign up");

    const isValid = await bcrypt.compare(req.body.password , user.password);
    if(!isValid) throw new Error(" Wrong password ");

    const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    const oneDay = 1000*60*60*24;

    res.cookie('token' , token , {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay)
    })

    res.status(200).json({
        msg: 'user logged in sucessfully'
    })
}

exports.logout = (req , res) => {

    res.cookie('token' , 'logout' , {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(200).json({
        msg: "logged out successfully"
    })
    
}

const { User } = require("../model/user");
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req , res , next) => {
    if(!req.cookies) throw new Error('Not a authenticated user');
    const {token} = req.cookies;
    if(!token) throw new Error('Not a authenticated user');

    const isVerify = jwt.verify(token , process.env.JWT_SECRET);
    const user = await User.findById(isVerify.userId);
    if(!user) throw new Error('Not a authenticated user');
    req.user = user;
    // console.log(user);
    next();
}

exports.authorizeUser = (req , res , next) => {
    if(req.user.role !== 'admin') throw new Error('you are not authorized to access this route');
    next();
}
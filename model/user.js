const mongoose = require('mongoose');
const { ROLE_STATUS } = require('../utils/constant');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: Object.values(ROLE_STATUS),
        default: ROLE_STATUS.USER,
    }
})

exports.User = mongoose.model('User' , userSchema);

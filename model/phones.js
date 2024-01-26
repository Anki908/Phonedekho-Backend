const mongoose = require('mongoose');
const { ROLE_STATUS } = require('../utils/constant');

const phoneSchema = new mongoose.Schema({
    company: String,
    model: Number,
    price: Number,
    rating: Number,
    photo: String,
    role: {
        type: String,
        enum: Object.values(ROLE_STATUS),
        default: ROLE_STATUS.USER,
    }
})

const Phone = mongoose.model('Phone' , phoneSchema);
module.exports = Phone;
const Phone = require('../model/phones');
const {ROLE_STATUS} = require('../utils/constant');
const mongoose = require('mongoose');

const { body , validationResult , param } = require('express-validator')

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req , res , next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error) => error.msg);
                //console.log(errorMessages[0]);
                throw new Error(errorMessages[0]);
            }
            next();
        }
    ]
}

exports.validatePhoneInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('model').notEmpty().withMessage('model is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('rating').notEmpty().withMessage('rating is required'),
    body('role').isIn(Object.values(ROLE_STATUS)).withMessage('invalid role type')
])

exports.validateIdParam = withValidationErrors([
    param('id')
    .custom(async (value , {req}) => {
        const validId = mongoose.Types.ObjectId.isValid(value);
        if(!validId) throw new Error("not a valid mongoDB id");

        const phone = Phone.findById(value);
        if(!phone) throw new Error("not found any phone with corresponding id");
    })
])

exports.validateUpdateInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('model').notEmpty().withMessage('model is required'),
    body('price').notEmpty().withMessage('price is required')
])

exports.validateSignUp = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Please write correct email'),
    body('password').notEmpty().withMessage('password is required').isLength({min: 8}).withMessage('please provide password of minimum 8 chars')
])

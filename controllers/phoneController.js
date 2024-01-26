const Phone = require('../model/phones');
require('express-async-errors');

exports.getAllPhone = async (req , res) => {
    const phones = await Phone.find();
    res.status(200).json({
        status: "success",
        phone: phones
    })
}

exports.postPhone = async (req , res) => {
    console.log(req.file);
    const newPhone = await Phone.create(req.body);
    res.status(200).json({
        status: "success",
        phone: newPhone
    })
}

exports.updatePhone = async(req , res) => {
    const id = req.params.id;
    console.log(id);
    const updatedPhone = await Phone.findByIdAndUpdate(id , req.body);
    res.status(200).json({
        status: "success",
        phone: updatedPhone
    })
}
exports.deletePhone = async(req , res) => {
    const id = req.params.id;
    await Phone.findByIdAndDelete(id);
    res.status(200).json({
        status: "success",
        msg: "deleted successfully"
    })
}
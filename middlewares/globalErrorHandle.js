exports.globalErrorHandle = (err , req , res , next) => {
    const msg = err.message;
    //console.log("triggered");
    res.json({
        message: msg
    })
}
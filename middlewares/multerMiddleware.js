const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req , file , cb) => {
        cb(null , 'Public/uploads');
    },
    filename:(req , file , cb) => {
        const fileName = file.originalname;
        cb(null , fileName);
    },
})

exports.upload = multer({ storage });
const express = require("express");
const phoneController = require("../controllers/phoneController");
const validation = require("../middlewares/validation");
const { authenticateUser, authorizeUser } = require("../middlewares/userAuth");
const { upload } = require("../middlewares/multerMiddleware");
const router = express.Router();

router
  .route("/")
  .get(phoneController.getAllPhone)
  .post(authorizeUser , upload.single('photo') , validation.validatePhoneInput , phoneController.postPhone);

router
  .route("/:id")
  .patch(authorizeUser ,  validation.validateIdParam , validation.validateUpdateInput ,  phoneController.updatePhone)
  .delete(authorizeUser , validation.validateIdParam , phoneController.deletePhone);

module.exports = router;

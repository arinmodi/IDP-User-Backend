const router = require("express").Router({ mergeParams : true });
const multer = require("multer");

const { authMiddlewareForEmailVerification, authMiddlewareForLogin } = require("../../middleware/authMiddleware");
const validator = require("../../middleware/validator");

const { createUserSchema, loginUserSchema, onlyEmailSchema } = require("./@validationSchemas");

const login = require("./controllers/login");
const post = require("./controllers/post");
const requestEmailVerification = require("./controllers/requestEmailVerification");
const verifyEmail = require("./controllers/verifyEmail");
const uploadProfilePhoto = require("./controllers/uploadProfilePhoto");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const getMySelf = require("./controllers/getMySelf");

router.post("/", validator(createUserSchema), post);
router.post("/login", validator(loginUserSchema), login);
router.post("/uploadImage", multer().array("image", 1), uploadProfilePhoto);
router.post("/requestEmailVerification", validator(onlyEmailSchema), requestEmailVerification);
router.post("/forgotPassword", validator(onlyEmailSchema), forgotPassword);
router.post("/resetPassword", resetPassword);


router.get("/verifyEmail", authMiddlewareForEmailVerification, verifyEmail);
router.get("/mySelf", authMiddlewareForLogin, getMySelf);

module.exports = router;
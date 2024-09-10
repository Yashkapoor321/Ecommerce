const express = require("express");

const userController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.login);


router.get("/allusers", userController.getAllUser)
router.get("/:id",  userController.singleUser)



router.get("/logout", userController.logout);

module.exports = router;
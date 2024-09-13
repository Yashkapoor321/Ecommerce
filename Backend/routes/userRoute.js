const express = require("express");

const userController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

//                                 Post Method list
router.post("/register", userController.createUser);
router.post("/login", userController.login);

//                                 Get Method list
router.get("/allusers", userController.getAllUser)
router.get("/:id",  userController.getUser)

router.get("/logout", userController.logout);


//                                 Put Method list
router.put("/:id", userController.updateUser)

//                                 Delete Method list
router.delete("/:id", userController.deleteUser)


module.exports = router;
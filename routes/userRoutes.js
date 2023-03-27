const express = require('express');
const { createUser, getAllUsers, getUser, uptadeUser, deleteUser , login, register} = require("../controllers/userController");

const router = express.Router();


router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUser).put(uptadeUser).delete(deleteUser);

module.exports = router;
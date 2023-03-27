const express = require('express');
const { createCategory, getAllCategory, getCategory, uptadeCategory, deleteCategory } = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(createCategory).get(getAllCategory);
router.route("/:id").get(getCategory).put(uptadeCategory).delete(deleteCategory);

module.exports = router;
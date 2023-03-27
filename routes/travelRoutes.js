const express = require('express');
const { createTravel, getAllTravel, getTravel, uptadeTravel, deleteTravel } = require("../controllers/travel");

const router = express.Router();

router.route("/").post(createTravel).get(getAllTravel);
router.route("/:id").get(getTravel).put(uptadeTravel).delete(deleteTravel);

module.exports = router;
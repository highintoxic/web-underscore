const express = require("express");
const { scheduleMeeting, checkMeeting } = require("../controllers/meeting");

const router = express.Router();

router.post("/", scheduleMeeting);
router.get("/:id", checkMeeting);

module.exports = router;

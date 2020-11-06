const express = require("express");
const router = express.Router();

const profiles = require("./profiles");
const users = require("./users");
const status = require("./status");


router.use("/profiles", profiles);
router.use("/users", users);
router.use("/status", status);


module.exports = router;

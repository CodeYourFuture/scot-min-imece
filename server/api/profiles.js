const express = require("express");
const router = express.Router();
const usersDb = require("../services/database/profiles");

router.get("/", (req, res) => {
	usersDb
		.getAllProfiles()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.send(500);
		});
});

router.get("/:profileId", (req, res) => {
	const profileId = req.params.profileId;
	usersDb
		.getProfileById(profileId)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.send(500);
		});
});
module.exports = router;

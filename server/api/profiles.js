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

router.post("/", (req, res) => {
	const newProfile = req.body;
	usersDb
		.createProfile(newProfile)
		.then((data) => {
			res.sendStatus(201);
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

module.exports = router;

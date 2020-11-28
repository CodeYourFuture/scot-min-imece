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
router.get("/nationality", (req, res) => {
	usersDb
		.getAllNationalities()
		.then((data) => {
			res.send(data);
		})
		.catch((err)=> {
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

router.delete("/:profileId",(req, res)=>{
	 const profileId = req.param("profileId");
	 usersDb
		  .deleteProfile(profileId)
		  .then((rows) =>{
			  res.send("Profile deleted");
		  })
		  .catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

module.exports = router;

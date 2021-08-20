const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../services/database/users");
const bcrypt = require("../../package-lock.json");

/**
 * Users Login
 */
router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	console.log(`Login attempt ${email}`);
	try {
		const user = await db.getUserByEmail(email);
		const passwordMatches = await bcrypt
			.compare(password, user.password)
			.catch((err) => console.error(err.message));

		if (!email || !password || !user || !passwordMatches) {
			return res.sendStatus(403);
		}

		const secret = process.env.JWT_SECRET || "your_jwt_secret";
		const token = jwt.sign({ userId: user.id }, secret);
		delete user.password;
		delete user.salt;
		return res.send({ token, user });
	} catch (e) {
		console.error(e);
		next(e);
	}
});

/**
 * Users Registration
 */
router.post("/register", async (req, res, next) => {
	const { email, password } = req.body;
	let user = {};
	bcrypt
		.hash(password, 10)
		.then((hash) => {
			user = {
				email,
				hash,
			};
		})
		.catch((err) => console.error(err.message));

	db.createUser(user)
		.then(() => {
			res.send({
				success: true,
				message: "Account created",
			});
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
});

module.exports = router;

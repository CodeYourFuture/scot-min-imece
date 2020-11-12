const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllProfiles = () => {
	return pool.query("SELECT * FROM profiles")
	.then((result) => result.rows)
	.catch((error) => {
		console.error(error);
		throw error;
	});
};

module.exports = {
	getAllProfiles
};

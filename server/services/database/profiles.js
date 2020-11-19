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

const getProfileById = (id) => {
	return pool
		.query("SELECT * FROM profiles where id = $1", [id])
		.then((result) => result.rows[0])
		.catch((error) => {
			console.error(error);
			throw error;
		});
};

module.exports = {
	getAllProfiles,
	getProfileById
};

const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

/**
 * This is used for testing the Client<->API connection, but this operation
 * won't be allowed in the final version of the project as it is a
 * security risk to expose all users
 */
const getAllUsers = () => {
	return pool.query("SELECT id, email FROM users").then((result) => result.rows);
};

const getUserByEmail = (email) => {
	return pool
		.query("SELECT * FROM users where email = $1", [email])
		.then((result) => result.rows[0]);
};

const createUser = ({ email, password }) => {
	return pool
		.query("INSERT INTO users (email, password) values ($1, $2)", [
			email,
			password,
		])
		.then((result) => result.rows);
};

const getUserById = (id) => {
	return pool
		.query("SELECT * FROM users where id = $1", [id])
		.then((result) => result.rows[0])
		.catch((error) => {
			console.error(error);
			throw error;
		});
};

module.exports = {
	getUserByEmail,
	createUser,
	getUserById,
	getAllUsers,
};

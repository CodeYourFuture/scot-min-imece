const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllProfiles = () => {
	return pool
		.query(
			"SELECT * FROM profiles",
		)
		.then((result) => result.rows);
};

const createProfile = (newProfile) => {
	return pool
		.query(
			"INSERT INTO profiles ( first_name, last_name, date_of_birth, gender, email, address, phone_number ) values ( $1, $2, $3, $4, $5, $6, $7)",
			[
				newProfile.firstname,
				newProfile.lastname,
				newProfile.dob,
				newProfile.gender,
				newProfile.email,
				newProfile.address,
				newProfile.phone,
			],
		)
		.then((result) => result.rows);
};

module.exports = {
	getAllProfiles,
	createProfile,
};

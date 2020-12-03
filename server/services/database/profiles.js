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
	pool
		.query(
			"INSERT INTO profiles ( first_name, last_name, date_of_birth, gender, email, address, phone_number ) values ( $1, $2, $3, $4, $5, $6, $7) RETURNING id",
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
		.then((result) => {
		 let id= result.row[0].id;
		newProfile.groups.forEach(groupId =>{
			 pool
				.query("INSERT INTO profile_group values($1,$2)",[id,groupId])
			.then((result)=>{});

		});
		return whatever;
});

const deleteProfile = (profileId) => {
	return pool
	   .query(
		"DELETE FROM profiles WHERE id = $1", [ profileId ]
	   )
	   .then((result) => result.rows);
};
  
const getProfileById = (id) => {
	return pool
		.query("SELECT * FROM profiles where id = $1", [id])
		.then((result) => result.rows[0])
};

module.exports = {
	getAllProfiles,
	getProfileById,
	createProfile,
	deleteProfile
};

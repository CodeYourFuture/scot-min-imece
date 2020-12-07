const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllProfiles = () => {
	return pool.query("select * from profiles")
                .then((result) => result.rows);
};

const createProfile = (newProfile) => {
	return pool
		.query(
			"INSERT INTO profiles ( first_name, last_name, date_of_birth, gender, email, address, phone_number, type) values ( $1, $2, $3, $4, $5, $6, $7, $8)",
			[
				newProfile.firstname,
				newProfile.lastname,
				newProfile.dob,
				newProfile.gender,
				newProfile.email,
				newProfile.address,
				newProfile.phone,
				newProfile.profile_type,
			],
		)
		.then((result) => result.rows);
};

const deleteProfile = (profileId) => {
	return pool
		.query("DELETE FROM profiles WHERE id = $1", [profileId])
		.then((result) => result.rows);
};

const getProfileById = (id) => {
	return pool
		.query("select profiles.*, array_agg(' ' || groups.group_name ) as groups \
				from profile_group \
				inner join groups \
				   on groups.id=profile_group.group_id\
				full outer join profiles \
				   on profiles.id=profile_group.profile_id \
				group by(profiles.id) having profiles.id=$1", 
				[id])
		.then((result) => result.rows[0]);
};

const getAllNationalities = () => {
	return pool.query("SELECT * FROM nationalities").then((result) => result.rows);
};

const getAllGroups = () => {
	return pool.query("select id, group_name, coalesce(array_agg(profile_id) filter (where profile_group.profile_id is not null), '{}') members \
					   from groups \
					   left join profile_group \
						on groups.id = group_id \
					   group by (id) order by id;")
	          .then((result) => result.rows);
};

module.exports = {
	getAllProfiles,
	getProfileById,
	createProfile,
	deleteProfile,
	getAllNationalities,
	getAllGroups
};

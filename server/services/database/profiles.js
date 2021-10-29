const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);
const format = require("pg-format");

const getAllProfiles = () => {
	return pool.query("select * from profiles").then((result) => result.rows);
};

const createProfile = (newProfile) => {
	return pool
		.query(
			"INSERT INTO profiles ( first_name, last_name, date_of_birth, gender, email, address, phone_number, type, nationality_id) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
			[
				newProfile.first_name,
				newProfile.last_name,
				newProfile.date_of_birth,
				newProfile.gender,
				newProfile.email,
				newProfile.address,
				newProfile.phone_number,
				newProfile.type,
				newProfile.nationality_id,
			],
		)
		.then((result)=>{
			let profileId=result.rows[0].id;
			const values = newProfile.groups.map((groupId) => [profileId, groupId]);

			if(values.length > 0) {
				let sql = format("INSERT INTO profile_group VALUES %L", values);
				return pool.query(sql);
			}
		});
};

const deleteProfile = (profileId) => {
	return pool
    .query("DELETE FROM profile_group WHERE profile_id = $1", [profileId])
    .then(() => {
      return pool.query("DELETE FROM profiles WHERE id = $1", [profileId]);
    });
};


const getProfileById = (id) => {
	return pool
		.query("select age(profiles.date_of_birth) as age, profiles.*, coalesce(array_agg(group_name) filter (where profile_group.profile_id is not null), '{}') as groups\
			from profiles\
			left join profile_group\
			   on profile_group.profile_id = profiles.id\
			left join groups\
			   on profile_group.group_id = groups.id\
			where profiles.id = $1\
			group by profiles.id;", 
				[id])
		.then((result) => result.rows[0]);
};

//checks if email is not unique
const getProfileByEmail = (email) => {
	return pool
		.query("select * from profiles where email = $1", [email])
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

const updateProfileById = (profileId, updatedProfile) => {

//console.log(updatedProfile)
	return  pool.query("UPDATE profiles SET first_name=$1,last_name=$2, address=$3, email=$4, phone_number=$5, nationality_id=$6, gender=$7, date_of_birth=$8, status=$9, join_date=$10, type=$11 WHERE id=$12",  [updatedProfile.first_name, updatedProfile.last_name,updatedProfile.address, updatedProfile.email,updatedProfile.phone_number, updatedProfile.nationality_id,updatedProfile.gender,updatedProfile.date_of_birth,updatedProfile.status, updatedProfile.join_date, updatedProfile.type,profileId]).then(() => {return pool.query("DELETE FROM profile_group WHERE profile_id = $1", [profileId]);}).then(() => {
		const values = updatedProfile.groups.map((groupId) => [profileId, groupId]);
		if(values.length > 0) {
			let sql = format("INSERT INTO profile_group VALUES %L", values);
			return pool.query(sql);
		}
	}).then(() => console.log(`Customer ${profileId} updated!`)).catch((e) => console.error(e));

};









module.exports = {
	getAllProfiles,
	getProfileById,
	createProfile,
	deleteProfile,
	getAllNationalities,
	getAllGroups,
	updateProfileById,
	getProfileByEmail,
};


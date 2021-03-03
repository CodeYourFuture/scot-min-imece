const config = {
	development: {
		user: "app_user",
		host: "localhost",
		database: "min_imece",
		password: "password",
		port: 5432,
	},
	production: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	},
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];

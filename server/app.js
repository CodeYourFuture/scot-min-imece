const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const api = require("./api");
const auth = require("./auth/routes");
const passport = require("passport");

require("./auth/passport");

/**
 * register middleware
 */
app.use(express.json());
app.use(cors());

/**
 * register routes
 */
app.use("/auth", auth);
app.use("/api", passport.authenticate("jwt", { session: false }), api);

/**
 * In development environemnt, we use the create-react-app dev server.
 * In production, the static build is served from here
 */
//
if (process.env.NODE_ENV !== "development") {
	app.use("/", express.static(path.resolve(__dirname, "../client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
	});
}

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));

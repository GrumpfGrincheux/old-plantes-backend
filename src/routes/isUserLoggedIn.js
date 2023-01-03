const auth = require("../auth/auth");
module.exports = (app) => {
	app.post("/api/auth", auth, (req, res) => {
		app.use(auth()).then(console.log("lala"));
	});
};

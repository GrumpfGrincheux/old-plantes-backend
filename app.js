// Middlewares externes (npm install <lala>)
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
// const session = require("express-session");
// const csurf = require("csurf");

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

app
	.use(bodyParser.json())
	.use(cors())
	.use(
		morgan(
			":method :url :status :res[content-length] - :response-time ms :date[web]",
		),
	)
	.use(helmet())
	.use(favicon("./favicon.ico"));
// .use(
// 	session({
// 		resave: true,
// 		secret: "notagoodsecret",
// 		saveUninitialized: true,
// 		cookie: { httpOnly: true },
// 	}),
// )
// .use(function (req, res, next) {
// 	res.locals.csrftoken = req.session._csrf;
// 	next();
// })
// .use(csurf());

sequelize.initDb();

app.get("/", (req, res) => {
	res.json("Welcome ! 👋");
});

// Ici nous placerons nos points de terminaison

require("./src/routes/login")(app);
require("./src/routes/findByFamille")(app);
require("./src/routes/findByGenre")(app);
require("./src/routes/findByEspece")(app);
require("./src/routes/createFamille")(app);
require("./src/routes/createGenre")(app);
require("./src/routes/createEspece")(app);
require("./src/routes/verifyToken")(app);

// Gestion de l'erreur 404
app.use(({ res }) => {
	const message = "Erreur 404 : Impossible de trouver la ressource demandée !";
	res.status(404).json({ message });
});

app.listen(port, () => console.log(`Je tourne sur localhost:${port}`));

// Middlewares externes (npm install <lala>)
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const corsOptions = {
	origin: "http://127.0.0.1:5500",
	optionsSuccessStatus: 200,
};

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

app.use(bodyParser.json()).use(cors(corsOptions)).use(morgan()).use(helmet());

sequelize.initDb();

app.get("/", (req, res) => {
	res.json("Welcome ! 👋");
});

// Ici nous placerons nos points de terminaison

require("./src/routes/login")(app);
require("./src/routes/findByFamille")(app);
require("./src/routes/findByGenre")(app);
require("./src/routes/findByEspece")(app);

// Gestion de l'erreur 404
app.use(({ res }) => {
	const message = "Erreur 404 : Impossible de trouver la ressource demandée !";
	res.status(404).json({ message });
});

app.listen(port, () => console.log(`Je tourne sur localhost:${port}`));

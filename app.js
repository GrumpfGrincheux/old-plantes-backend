// Middlewares externes (npm install <lala>)
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()).use(cors()).use(morgan()).use(helmet());

sequelize.initDb();

app.get("/", (req, res) => {
	res.json("Welcome ! 👋");
});

// Ici nous placerons nos points de terminaison

require("./src/routes/login")(app);
require("./src/routes/findByFamille")(app);
require("./src/routes/findByGenre")(app);
require("./src/routes/findByEspece")(app);
require("./src/routes/findAll")(app);

// Gestion de l'erreur 404
app.use(({ res }) => {
	const message = "Erreur 404 : Impossible de trouver la ressource demandée !";
	res.status(404).json({ message });
});

app.listen(port, () => console.log(`Je tourne sur localhost:${port}`));

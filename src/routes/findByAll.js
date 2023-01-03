// const { Espece, Genre, Famille } = require("../db/sequelize");
// const { Op } = require("sequelize");
// const auth = require("../auth/auth");
const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "plantes",
});
connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database");
});

module.exports = (app) => {
	app.post("/find/alls", (req, res) => {
		if (req.body.search != "") {
			console.log("prout");
			const securityRegex = /[^a-zA-Z é]/g;
			const name = req.body.search.replace(securityRegex, "");
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			const query = `SELECT DISTINCT familles.name AS famille, genres.name AS genre, especes.name AS espece
      FROM especes 
      INNER JOIN familles ON especes.famille_id = familles.id 
      INNER JOIN genres ON especes.genre_id = genres.id 
      WHERE familles.name LIKE '%${name}%' 
      OR genres.name LIKE '%${name}%' 
      OR especes.name LIKE '%${name}%' 
      ORDER BY famille, genre, espece;`;
			connection.query(query, (error, results) => {
				if (error) {
					console.log(error);
				} else {
					console.log(res.json(results));
				}
			});
		}
	});
};

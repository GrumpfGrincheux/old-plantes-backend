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
const query = "SELECT * FROM Especes WHERE name LIKE ?";

module.exports = (app) => {
	app.post("/find/alls", (req, res) => {
		if (req.body.search != "") {
			const name = req.body.search;
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			return connection.query(query, [`%${name}%`], (error, results) => {
				if (error) throw error;
				console.log(results);
			});
		}
	});
};

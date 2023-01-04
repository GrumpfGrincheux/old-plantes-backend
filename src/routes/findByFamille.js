const { Espece, Genre, Famille } = require("../db/sequelize");
const { sequelize } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.post("/find/familles", auth, (req, res) => {
		if (req.query.name) {
			const name = req.query.name;
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			const limit = parseInt(req.query.limit) || 25;

			return sequelize
				.query(
					`SELECT DISTINCT familles.name AS famille, genres.name AS genre, especes.name AS espece
          FROM especes
          INNER JOIN familles ON especes.famille_id = familles.id
          INNER JOIN genres ON especes.genre_id = genres.id
          WHERE familles.name LIKE \"%${name}%\" 
          OR genres.name LIKE \"%${name}%\" 
          OR especes.name LIKE \"%${name}%\"
          ORDER BY famille, genre, espece;`,
				)
				.then(({ rows }) => {
					res.json({ rows });
					console.log(res);
				});

			Espece.findAndCountAll({
				include: [
					{
						model: Famille,
						as: "famille",
						where: {
							name: {
								[Op.like]: `%${name}%`,
							},
						},
					},
					Genre,
				],
				order: ["name"],
				limit: limit,
			}).then(({ count, rows }) => {
				const message = `Il y a ${count} especès qui correspondent à votre recherche : ${name}`;
				res.json({ message, data: rows });
			});
		}
	});
};

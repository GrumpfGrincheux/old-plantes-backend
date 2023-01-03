const { Espece, Genre, Famille } = require("../db/sequelize");
const { Op } = require("sequelize");
// const auth = require("../auth/auth");

module.exports = (app) => {
	app.post("/find/especes", (req, res) => {
		if (req.body.search != "") {
			const name = req.body.search;
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			const limit = parseInt(req.query.limit) || 25;
			return Espece.findAndCountAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
				include: ["genre", "famille"],
				order: ["name"],
				limit: limit,
			}).then(({ count, rows }) => {
				const message = `Il y a ${count} especès qui correspondent à votre recherche : ${name}`;
				res.json({ message, data: rows });
			});
		}
	});
};

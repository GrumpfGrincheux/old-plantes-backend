const { Espece, Genre, Famille } = require("../db/sequelize");
const { Op } = require("sequelize");
// const auth = require("../auth/auth");

module.exports = (app) => {
	app.get("/find/familles", (req, res) => {
		if (req.query.name) {
			const name = req.query.name;
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			const limit = parseInt(req.query.limit) || 25;
			return Espece.findAndCountAll({
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

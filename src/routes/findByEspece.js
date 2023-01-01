const { Espece } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.get("/find/especes", auth, (req, res) => {
		if (req.query.name) {
			const name = req.query.name;
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
				order: ["name"],
				limit: limit,
			}).then(({ count, rows }) => {
				const message = `Il y a ${count} especès qui correspondent à votre recherche : ${name}`;
				res.json({ message, data: rows });
			});
		} else if (req.query.id) {
			const id = req.query.id;
			return Espece.findByPk(req.params.id)
				.then((espece) => {
					if (espece === null) {
						const message = `Erreur 404 : L'identifiant 'espece_id=${id}' n'est pas attribué.`;
						return res.status(404).json({ message });
					}
					const message = "Une espèce a bien été trouvée.";
					res.json({ message, data: espece });
				})
				.catch((error) => {
					const message =
						"Erreur 500 : L'espèce n'a pas pu être récupérée. Réessayez dans quelques instants";
					res.status(500).json({ message, data: error });
				});
		}
	});
};

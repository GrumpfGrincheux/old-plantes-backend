const { Famille } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.get("/find/familles", auth, (req, res) => {
		if (req.query.name) {
			const name = req.query.name;
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			const limit = parseInt(req.query.limit) || 25;
			return Famille.findAndCountAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
				order: ["name"],
				limit: limit,
			}).then(({ count, rows }) => {
				const message = `Il y a ${count} familles qui correspondent à votre recherche : ${name}`;
				res.json({ message, data: rows });
			});
		} else if (req.query.id) {
			const id = req.query.id;
			return Famille.findByPk(req.params.id)
				.then((famille) => {
					if (famille === null) {
						const message = `Erreur 404 : L'identifiant 'famille_id=${id}' n'est pas attribué.`;
						return res.status(404).json({ message });
					}
					const message = "Une famille a bien été trouvée.";
					res.json({ message, data: famille });
				})
				.catch((error) => {
					const message =
						"Erreur 500 : La famille n'a pas pu être récupérée. Réessayez dans quelques instants";
					res.status(500).json({ message, data: error });
				});
		}
	});
};

const { Genre } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.get("/find/genres", auth, (req, res) => {
		if (req.query.name) {
			const name = req.query.name;
			if (name.length < 2) {
				const message =
					"Le terme de recherche doit contenir au moins 2 caractères.";
				return res.status(400).json({ message });
			}
			const limit = parseInt(req.query.limit) || 25;
			return Genre.findAndCountAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
				order: ["name"],
				limit: limit,
			}).then(({ count, rows }) => {
				const message = `Il y a ${count} genres qui correspondent à votre recherche : ${name}`;
				res.json({ message, data: rows });
			});
		} else if (req.query.id) {
			const id = req.query.id;
			return Genre.findByPk(req.params.id)
				.then((genre) => {
					if (genre === null) {
						const message = `Erreur 404 : L'identifiant 'genre_id=${id}' n'est pas attribué.`;
						return res.status(404).json({ message });
					}
					const message = "Un genre a bien été trouvé.";
					res.json({ message, data: genre });
				})
				.catch((error) => {
					const message =
						"Erreur 500 : Le genre n'a pas pu être récupéré. Réessayez dans quelques instants";
					res.status(500).json({ message, data: error });
				});
		}
	});
};

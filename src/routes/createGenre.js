const { Genre } = require("../db/sequelize");
const {
	ValidationError,
	Sequelize,
	UniqueConstraintError,
} = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.post("/create/genre", auth, (req, res) => {
		Genre.create(req.body)
			.then((genre) => {
				const message = `Le genre ${req.body.name} a bien été ajouté.`;
				res.json({ message, data: genre });
			})
			.catch((error) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				if (error instanceof UniqueConstraintError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message =
					"Erreur 500 : Le genre n'a pas pu être ajouté. Réessayez dans quelques instants";
				res.status(500).json({ message, data: error });
			});
	});
};

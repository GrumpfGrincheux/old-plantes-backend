const { Famille } = require("../db/sequelize");
const {
	ValidationError,
	Sequelize,
	UniqueConstraintError,
} = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.post("/create/famille", auth, (req, res) => {
		Famille.create(req.body)
			.then((famille) => {
				const message = `La famille ${req.body.name} a bien été ajoutée.`;
				res.json({ message, data: famille });
			})
			.catch((error) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				if (error instanceof UniqueConstraintError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message =
					"Erreur 500 : La famille n'a pas pu être ajoutée. Réessayez dans quelques instants";
				res.status(500).json({ message, data: error });
			});
	});
};

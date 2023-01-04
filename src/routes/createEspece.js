const { Espece } = require("../db/sequelize");
const {
	ValidationError,
	Sequelize,
	UniqueConstraintError,
} = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
	app.post("/create/espece", auth, (req, res) => {
		Espece.create(req.body)
			.then((espece) => {
				const message = `L'espèce ${req.body.name} a bien été ajoutée.`;
				res.json({ message, data: espece });
			})
			.catch((error) => {
				if (error instanceof ValidationError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				if (error instanceof UniqueConstraintError) {
					return res.status(400).json({ message: error.message, data: error });
				}
				const message =
					"Erreur 500 : L'espèce n'a pas pu être ajoutée. Réessayez dans quelques instants";
				res.status(500).json({ message, data: error });
			});
	});
};

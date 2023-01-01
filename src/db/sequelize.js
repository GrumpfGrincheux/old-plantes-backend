const { Sequelize, DataTypes } = require("sequelize");
const FamilleModel = require("../models/familles");
const GenreModel = require("../models/genres");
const EspeceModel = require("../models/especes");
const UserModel = require("../models/users");
const familles = require("./baseFamilles");
const genres = require("./baseGenres");
const especes = require("./baseEspeces");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("plantes", "root", "root", {
	host: "localhost",
	dialect: "mariadb",
	dialectOptions: {
		timezone: "Etc/GMT-2",
	},
	logging: false,
});

const Famille = FamilleModel(sequelize, DataTypes);
const Genre = GenreModel(sequelize, DataTypes);
const Espece = EspeceModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
	return sequelize.sync({ force: true }).then((_) => {
		familles.map((famille) => {
			Famille.create({
				name: famille.name,
			});
		});
		genres.map((genre) => {
			Genre.create({
				name: genre.name,
				famille_id: genre.famille_id,
			});
		});
		especes.map((espece) => {
			Espece.create({
				name: espece.name,
				genre_id: espece.genre_id,
				famille_id: espece.famille_id,
			});
		});

		bcrypt
			.hash("root", 10)
			.then((hash) => User.create({ username: "root", password: hash }));

		console.log("La base de donnée a bien été initialisée !");
	});
};

module.exports = {
	initDb,
	Famille,
	Genre,
	Espece,
	User,
};

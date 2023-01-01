module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Espece",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Cette espèce est déja dans la base de données.",
				},
				validate: {
					notEmpty: {
						msg: "Ce champ ne peut pas être vide",
					},
					notNull: {
						msg: "Ce champ est requis.",
					},
					len: {
						args: [1, 25],
						msg: "La longeur du nom doit être comprise entre 1 et 25 caractères.",
					},
					is: {
						args: /^[A-Z]{1}[a-z]+[ ]{1}[a-z]+$/g,
						msg: "Le nom ne peut contenir que des lettres.",
					},
				},
			},
			genre_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			famille_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			createdAt: "created",
			updatedAt: "update",
		},
	);
};

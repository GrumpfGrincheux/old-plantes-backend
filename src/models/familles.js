module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Famille",
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
					msg: "Cette famille est déja dans la base de données.",
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
						args: /^[A-Z]{1}[a-z]+acées$/g,
						msg: "Le nom ne peut contenir que des lettres.",
					},
				},
			},
		},
		{
			timestamps: true,
			createdAt: "created",
			updatedAt: "update",
		},
	);
};

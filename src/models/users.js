module.exports = (sequelize, DataTypes) => {
	return sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: {
				msg: "Cet nom d'utilisateur est déja utilisé.",
			},
		},
		password: {
			type: DataTypes.STRING,
		},
	});
};

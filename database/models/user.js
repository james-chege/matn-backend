module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};

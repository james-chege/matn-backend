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

    // User.associate = function (models) {
    //     // associations defined here
    //     User.hasMany(models.Course, {
    //         foreignKey: "userId",
    //         as: "courses",
    //         onDelete: "CASCADE",
    //     });
    // };
    return User;
};

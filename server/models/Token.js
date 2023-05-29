module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define("Token", {
        tokenId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "Users",
                key: "id"
            }
        }
    });

    return Token;
};
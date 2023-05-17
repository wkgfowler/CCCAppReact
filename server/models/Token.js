module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define("Token", {
        tokenId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
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
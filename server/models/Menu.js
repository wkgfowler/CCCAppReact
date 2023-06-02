module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define("Menu", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        menuImage: {
            type: DataTypes.STRING,
        },
        menuType: {
            type: DataTypes.STRING,
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        everyday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        sunday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        monday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        tuesday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        wednesday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        thursday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        friday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        saturday: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    });

    Menu.associate = function (models) {
        Menu.belongsTo(models.Restaurant, {
            foreignKey: "RestaurantId"
        });
    };

    return Menu;
}
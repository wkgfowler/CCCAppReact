module.exports = (sequelize, DataTypes) => {
    const Hours = sequelize.define("Hours", {
        weekday: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        openHour: {
            type: DataTypes.STRING
        },
        closeHour: {
            type: DataTypes.STRING
        },
        openStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        } 
    });

    Hours.associate = function (models) {
        Hours.belongsTo(models.Restaurant, {foreignKey: "RestaurantId"})
    };

    return Hours;
};
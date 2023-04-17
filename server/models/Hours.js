module.exports = (sequelize, DataTypes) => {
    const Hours = sequelize.define("Hours", {
        weekday: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        restaurantId: {
            type: DataTypes.STRING,
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
        Hours.belongsToMany(models.Restaurant, {through: "Restaurants_Hours"})
    };

    return Hours;
};
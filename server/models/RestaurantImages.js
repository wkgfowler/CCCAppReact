module.exports = (sequelize, DataTypes) => {
    const RestaurantImages = sequelize.define("RestaurantImages", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: DataTypes.STRING
        }
    })

    RestaurantImages.associate = function (models) {
        RestaurantImages.belongsTo(models.Restaurant, {
            foreignKey: "RestaurantId"
        });
    };

    return RestaurantImages;
}
module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        restaurantName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        streetAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        town: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mealTimes: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [""]
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        description: {
            type: DataTypes.STRING(600),
            allowNull: true
        },
        websiteURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebookURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        instagramURL: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        },

        // 9/14 adding in the option to make a restaurant not visible and mandatory to fill out initial form
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isVisible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Restaurant.associate = function (models) {
        Restaurant.belongsToMany(models.User, {through: 'Users_Restaurants'});
        Restaurant.hasMany(models.Hours, { foreignKey: "RestaurantId"});
        Restaurant.hasMany(models.SpecialEvent, { foreignKey: "RestaurantId"});
        Restaurant.hasMany(models.Menu, { foreignKey: "RestaurantId"});
        Restaurant.hasMany(models.RestaurantImages, { foreignKey: "RestaurantId"});

        // attempting to add follower table
        // Restaurant.belongsToMany(models.User, {through: 'Followers_Restaurants', foreignKey: 'followedRestaurantId', otherKey: 'UserId'})
        Restaurant.belongsToMany(models.User, {through: 'Follower', as: 'followed'})
    };

    return Restaurant;
}
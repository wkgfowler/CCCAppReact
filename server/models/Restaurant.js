module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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
        breakfast: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lunch: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dinner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brunch: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
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
        }
    });

    Restaurant.associate = function (models) {
        Restaurant.belongsToMany(models.User, {through: 'Users_Restaurants'});
        Restaurant.belongsToMany(models.Hours, {through: "Restaurants_Hours"});
        Restaurant.hasMany(models.SpecialEvent, { as: "SpecialEvent"});
    };

    return Restaurant;
}
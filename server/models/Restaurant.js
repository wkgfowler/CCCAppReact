module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define("Restaurant", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        restaurant_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        street_address: {
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
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebook_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        instagram_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    Restaurant.associate = function (models) {
        Restaurant.belongsToMany(models.User, {through: 'Users_Restaurants'});
        Restaurant.belongsToMany(models.Hours, {through: "Restaurants_Hours"});
    };

    return Restaurant;
}
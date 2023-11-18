module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Restaurant, {through: 'Users_Restaurants'});
        User.belongsToMany(models.Roles, {through: 'Users_Roles'});

        // attemtp to make follower table
        // User.belongsToMany(models.Restaurant, {through: 'Followers_Restaurants', foriegnKey: 'UserId', otherKey: 'followedRestaurantId'})
        User.belongsToMany(models.Restaurant, {through: 'Follower', as: 'follower'})
    };

    return User;
}
module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
        role: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    Roles.associate = function (models) {
        Roles.belongsToMany(models.User, {through: 'Users_Roles'})
    };
    
    return Roles;
};
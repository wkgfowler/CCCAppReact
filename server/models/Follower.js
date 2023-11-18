module.exports = (sequelize, DataTypes) => {
    const Follower = sequelize.define("Follower", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // restaurantId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    });

    return Follower
}
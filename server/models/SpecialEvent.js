module.exports = (sequelize, DataTypes) => {
    const SpecialEvent = sequelize.define("SpecialEvent", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        specialOrEvent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recurring: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        specialEventDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weekdays: {
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    SpecialEvent.associate = function (models) {
        SpecialEvent.belongsTo(models.Restaurant, {
            foreignKey: "restaurantId",
            as: "restaurant"
        })
    };

    return SpecialEvent;
}
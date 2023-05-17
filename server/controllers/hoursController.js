const db = require('../models');

const Hours = db.Hours;
const Restaurant = db.Restaurant;
const User = db.User;
const Roles = db.Roles;

// Get Restaurant Hours
const getHours = async (req, res) => {
    try {
        const validUser = await Restaurant.findOne({
            where: {
                id: req.params.restaurantId
            }, include: {
                model: User, where: { id: req.params.userId }
            }
        })

        const validAdmin = await User.findOne({
            where: {
                id: req.params.userId
            }, include: {
                model: Roles, where: { role: "admin"}
            }
        })

        if (validUser || validAdmin) {
            const hours = await Hours.findAll({
                where: {
                    restaurantId: req.params.restaurantId
                }
            })
            const restaurant = await Restaurant.findOne({
                where: {
                    id: req.params.restaurantId
                }
            })
            return res.json({valid: true, hours, restaurant})
        } 

        return res.json({valid: false});
    } catch (err) {
        console.error(err.message);
    }
};

// Update Restaurant Hours
const updateHours = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.restaurantId
            }
        });
        const restaurantMealtimes = await restaurant.set({
            breakfast: req.body.breakfast,
            brunch: req.body.brunch,
            lunch: req.body.lunch,
            dinner: req.body.dinner
        })
        await restaurantMealtimes.save();
        const sundayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 0
            }
        });
        const mondayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 1
            }
        });
        const tuesdayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 2
            }
        });
        const wednesdayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 3
            }
        });
        const thursdayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 4
            }
        });
        const fridayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 5
            }
        });
        const saturdayHours = await Hours.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                weekday: 6
            }
        });

        const setSundayHours = await sundayHours.set({
            openHour: req.body.sundayOpen,
            closeHour: req.body.sundayClose
        });
        await setSundayHours.save();
        const setMondayHours = await mondayHours.set({
            openHour: req.body.mondayOpen,
            closeHour: req.body.mondayClose
        });
        await setMondayHours.save();
        const setTuesdayHours = await tuesdayHours.set({
            openHour: req.body.tuesdayOpen,
            closeHour: req.body.tuesdayClose
        });
        await setTuesdayHours.save();
        const setWednesdayHours = await wednesdayHours.set({
            openHour: req.body.wednesdayOpen,
            closeHour: req.body.wednesdayClose
        });
        await setWednesdayHours.save();
        const setThursdayHours = await thursdayHours.set({
            openHour: req.body.thursdayOpen,
            closeHour: req.body.thursdayClose
        });
        await setThursdayHours.save();
        const setFridayHours = await fridayHours.set({
            openHour: req.body.fridayOpen,
            closeHour: req.body.fridayClose
        });
        await setFridayHours.save();
        const setSaturdayHours = await saturdayHours.set({
            openHour: req.body.saturdayOpen,
            closeHour: req.body.saturdayClose
        });
        await setSaturdayHours.save();

        return res.json("nailed it");

    } catch (err) {
        console.log("dammit")
        console.error(err.message)
    }
}

module.exports = {
    getHours,
    updateHours
}
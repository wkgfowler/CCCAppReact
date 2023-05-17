const db = require('../models');

const SpecialEvent = db.SpecialEvent;
const Restaurant = db.Restaurant;
const User = db.User;
const Roles = db.Roles;

const { Op } = require("sequelize");

// adding special/event
const addSpecialEvent = async (req, res) => {
    try {
        const newSpecialEvent = await SpecialEvent.create({
            restaurantId: req.body.restaurantId,
            specialOrEvent: req.body.specialOrEvent,
            name: req.body.name,
            description: req.body.description,
            recurring: req.body.recurring,
            weekdays: req.body.weekdays,
            specialEventDate: req.body.specialEventDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });

        return res.json("success")
    } catch (err) {
        console.error(err.message)
    }
}

// getting specials/events for calendar page
const getSpecialsEventsCalendar = async (req, res) => {
    try {
        console.log(req.params.currentMonth)
        const specials = await SpecialEvent.findAll({
            where: {
                [Op.or] : [
                    {specialEventDate: `${req.params.currentYear}-${req.params.currentMonth}-${req.params.today}`},
                    {weekdays: { [Op.contains]: [`${req.params.day}`]} }
                ]
            }, include: {
                model: Restaurant, as: "restaurant"
            }
        })

        return res.json(specials)
    } catch (err) {
        console.error(err.message)
    }
}

// getting specialsk/events for restaurant admin page
const getSpecialsEventsRestaurantAdmin = async (req, res) => {
    try {
        const validUser = await Restaurant.findOne({
            where: {
                id: req.params.restaurantId
            }, include: {
                model: User, where: { id: req.params.userId }
            }
        });

        const validAdmin = await User.findOne({
            where: {
                id: req.params.userId
            }, include: {
                model: Roles, where: { role: "admin"}
            }
        })

        const allSpecialsEvents = await SpecialEvent.findAll({
            where: {
                restaurantId: req.params.restaurantId
            }
        })

        if(validUser || validAdmin) {
            return res.json(allSpecialsEvents)
        }

        return res.json("not authorized")
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getSpecialsEventsCalendar,
    getSpecialsEventsRestaurantAdmin,
    addSpecialEvent
}
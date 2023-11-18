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
            RestaurantId: req.body.RestaurantId,
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
        console.log(req.query.towns)
        console.log(req.params.currentMonth)
        console.log(req.query.eventsOrSpecials)

        if (req.query.towns !== undefined && req.query.eventsOrSpecials !== undefined) {
            const specials = await Restaurant.findAll({
                attributes: ["restaurantName", "town"],
                where: {
                    town: {
                        [Op.in] : req.query.towns
                    }
                },
                include: {
                    model: SpecialEvent, as: "SpecialEvents",
                    where: {
                        [Op.or] : [
                            {specialEventDate: `${req.params.currentYear}-${req.params.currentMonth}-${req.params.today}`},
                            {weekdays: { [Op.contains]: [`${req.params.day}`]} }
                        ],
                        specialOrEvent: {
                            [Op.in]: req.query.eventsOrSpecials
                        }
                    }
                },
                order: [ 
                    // ['town', 'ASC'], 
                    ['restaurantName', 'ASC'] 
                ]
            })
            return res.json(specials)
        } else if (req.query.eventsOrSpecials !== undefined) {
            const specials = await Restaurant.findAll({
                attributes: ["restaurantName", "town"],
                include: {
                    model: SpecialEvent, as: "SpecialEvents",
                    where: {
                        [Op.or] : [
                            {specialEventDate: `${req.params.currentYear}-${req.params.currentMonth}-${req.params.today}`},
                            {weekdays: { [Op.contains]: [`${req.params.day}`]} }
                        ],
                        specialOrEvent: {
                            [Op.in]: req.query.eventsOrSpecials
                        }
                    }
                },
                order: [ 
                    // ['town', 'ASC'], 
                    ['restaurantName', 'ASC'] 
                ]
            })
            return res.json(specials)
        } else if (req.query.towns !== undefined) {
            const specials = await Restaurant.findAll({
                attributes: ["restaurantName", "town"],
                where: {
                    town: {
                        [Op.in] : req.query.towns
                    }
                },
                include: {
                    model: SpecialEvent, as: "SpecialEvents",
                    where: {
                        [Op.or] : [
                            {specialEventDate: `${req.params.currentYear}-${req.params.currentMonth}-${req.params.today}`},
                            {weekdays: { [Op.contains]: [`${req.params.day}`]} }
                        ]
                    }
                },
                order: [ 
                    // ['town', 'ASC'], 
                    ['restaurantName', 'ASC'] 
                ]
            })

            return res.json(specials)
        }

        const specials = await Restaurant.findAll({
            attributes: ["restaurantName", "town"],
            include: {
                model: SpecialEvent, as: "SpecialEvents",
                where: {
                    [Op.or] : [
                        {specialEventDate: `${req.params.currentYear}-${req.params.currentMonth}-${req.params.today}`},
                        {weekdays: { [Op.contains]: [`${req.params.day}`]} }
                    ]
                }
            },
            order: [ 
                // ['town', 'ASC'], 
                ['restaurantName', 'ASC'] 
            ]
        })
        
        return res.json(specials)
    } catch (err) {
        console.error(err.message)
    }
}

// getting specials/events for restaurant admin page
const getSpecialsEventsRestaurantAdmin = async (req, res) => {
    try {
        const validUser = await Restaurant.findOne({
            where: {
                id: req.params.RestaurantId
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

        if (req.params.specialOrEvent !== undefined) {
            
        }
        const allSpecialsEvents = await SpecialEvent.findAll({
            where: {
                RestaurantId: req.params.RestaurantId
            },
            order: ['specialOrEvent']
        })

        const recurringSpecialsEvents = await SpecialEvent.findAll({
            where: {
                RestaurantId: req.params.RestaurantId,
                recurring: true
            },
            order: ['specialOrEvent']
        })

        if(validUser || validAdmin) {
            return res.json({allSpecialsEvents, recurringSpecialsEvents})
        }

        return res.json("not authorized")
    } catch (err) {
        console.error(err.message);
    }
}

// updating specials/events
const updateSpecialEvent = async (req, res) => {
    try {
        const udpatedSpecialEvent = await SpecialEvent.update({
            specialOrEvent: req.body.specialOrEvent,
            name: req.body.name,
            description: req.body.description,
            recurring: req.body.recurring,
            weekdays: req.body.weekdays,
            specialEventDate: req.body.specialEventDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        },
        {
            where: {
                id: req.params.id
            }
        })

        return res.json("nailed it")
    } catch (err) {
        console.error(err.message)
    }
}

// delete special/event
const deleteSpecialEvent = async (req, res) => {
    try {
        const specialEvent = await SpecialEvent.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.json("almost there")
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    getSpecialsEventsCalendar,
    getSpecialsEventsRestaurantAdmin,
    addSpecialEvent,
    updateSpecialEvent,
    deleteSpecialEvent
}
require("dotenv").config();
const router = require('express').Router();
const {User, Restaurant} = require('../models');


// calling ALL RESTAURANTS
router.get('/allrestaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        return res.json(restaurants)
    } catch (err) {
        console.log('try again')
    }
})

// calling restaurant page
router.get("/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log('hi')
        if (restaurant) {
            console.log(restaurant)
            return res.json({valid: true, restaurant});
        };
        if (!restaurant) {
            console.log('almost')
        }
    
    } catch (err) {
        console.log('try again')
        return res.json(false)
    }
})


module.exports = router;
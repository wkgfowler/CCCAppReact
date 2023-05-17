require("dotenv").config();
const router = require('express').Router();
const {User, Restaurant} = require('../models');
const restaurantController = require('../controllers/restaurantController')


// calling ALL RESTAURANTS
router.get('/allrestaurants', restaurantController.getAllRestaurants)

// calling restaurant page
router.get("/restaurants/:id", restaurantController.getRestaurantPage)


module.exports = router;
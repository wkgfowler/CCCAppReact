require("dotenv").config();
const router = require('express').Router();
const {User, Restaurant} = require('../models');
const restaurantController = require('../controllers/restaurantController')


// calling ALL RESTAURANTS
router.get('/getRestaurants/:town', restaurantController.getRestaurants)

// calling specific town restarautns
router.get('/:townName/restaurants', restaurantController.getTownRestaurants)

// calling restaurant page
router.get("/restaurants/:id", restaurantController.getRestaurantPage)


module.exports = router;
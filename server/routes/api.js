const router = require('express').Router();
const {User, Restaurant, Hours, SpecialEvent, Roles} = require('../models');
const userController = require('../controllers/userController');
const hoursController = require('../controllers/hoursController');
const restaurantController = require('../controllers/restaurantController');
const specialEventController = require('../controllers/specialEventController');
const menuController = require('../controllers/menuController')
const authorization = require('../middleware/authorization');
const restaurantImagesController = require('../controllers/restaurantImagesController');
const followerController = require('../controllers/followerController');
require("dotenv").config();
const { Op } = require("sequelize");



// loading user page
router.get("/:id", authorization, userController.loadProfile)


// validating user for restaurant info edit page
router.get("/get_restaurant/:RestaurantId/:userId", authorization, restaurantController.getUserRestaurantPage)

// initial form
router.post("/initial_info", authorization, restaurantController.upload, restaurantController.initialInformationForm)

// updating restaurant contact info
router.post("/contact_info", authorization, restaurantController.updatingRestaurantContactInfo)

// updating restaurant additional info
router.post("/additional_info", authorization, restaurantController.upload, restaurantController.updatingRestaurantAdditionalInfo)

// add profile image
router.post("/add_profile_image", authorization, restaurantController.upload, restaurantController.addProfileImage)

// RESTAURANT HOURS
router.get("/get_hours/:RestaurantId/:userId", authorization, hoursController.getHours)

// updating restaurant hours
router.post("/update_hours", authorization, hoursController.updateHours)

// adding special/event
router.post("/add_special_event", authorization, specialEventController.addSpecialEvent)

// updating special/event
router.post("/update_special_event/:id", authorization, specialEventController.updateSpecialEvent)

// deleteing special/event
router.delete("/delete_specialEvent/:id", authorization, specialEventController.deleteSpecialEvent)

// getting specials/events for calendar page
router.get("/get_specials/:currentYear-:currentMonth-:today/:day", specialEventController.getSpecialsEventsCalendar)

// getting all specials/events for a restaurant admins page
router.get("/get_all_specials_events/:RestaurantId/:userId", authorization, specialEventController.getSpecialsEventsRestaurantAdmin)

// adding menus
router.post("/add_menu", authorization, menuController.upload, menuController.menuUpload)

// getting menus for edit page
router.get("/get_menus/:RestaurantId/:userId", authorization, menuController.getMenusForEdit)

// loading specific menu for edit page
router.get("/get_menus/:RestaurantId/:userId/:typeOfMenu", authorization, menuController.getSpecificMenuForEdit)

// admin page ALL RESTAURANTS/USERS
router.get("/admin/all_restaurants", restaurantController.adminAllRestaurantsAndUsers)

// calling ALL RESTAURANTS
router.get('/getRestaurants/:town', restaurantController.getRestaurants)

// calling restaurant page
router.get("/restaurants/:id", restaurantController.getRestaurantPage)

// upload restaurant images
router.post("/add_restaurant_image", authorization, restaurantImagesController.upload, restaurantImagesController.restaurantImagesUpload)

// delete restaurant image
router.delete("/restaurantImages/:id", authorization, restaurantImagesController.deleteRestaurantImage)

// delete restaurant menu
router.delete("/restaurantMenu/:id", authorization, menuController.deleteMenuImage)

// contact us message
router.post("/contact_us_message", userController.contactUsMessage)

// following a restaurant
router.post("/followRestaurant", authorization, followerController.followRestaurant)

// unfollowing a restaurant
router.delete("/unfollowRestaurant/:restaurantId/:userId", followerController.unfollowRestaurant)

// loading followed restaurants for user page
router.get("/user/followed_restaurants/:id", authorization, userController.followedRestaurants)

module.exports = router;
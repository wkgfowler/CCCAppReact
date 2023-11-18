const router = require('express').Router();
const {User, Restaurant, Roles, Hours} = require('../models');
const bcrypt = require('bcrypt');
const validInfo = require('../middleware/validinfo');
const validInfoRestaurant = require('../middleware/validinforestaurant')
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../middleware/authorization');
const login = require('../middleware/login');
const logout = require('../middleware/logout');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const restaurantController = require('../controllers/restaurantController')
const userController = require('../controllers/userController')
require("dotenv").config();


// setting up roles in roles table
router.post("/roles", async (req, res) => {
    try {
        const basic = await Roles.create({
            role: req.body.basic
        });

        const restaurant = await Roles.create({
            role: req.body.restaurant
        });

        const admin = await Roles.create({
            role: req.body.admin
        });

        return res.json("WOOHOO")
    } catch (err) {
        console.error(err.message)
    }
})


// setting up admin account
router.post("/admin", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const admin = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });
        
        const role = await Roles.findOne({
            where: {
                role: "admin"
            }
        })
        await admin.addRoles(role)
        return res.json("FUCK YEAH")
    } catch (err) {
        console.error(err.message);
    }
})


// creating restaurant account as admin
router.post("/admin/create_restaurant", restaurantController.adminCreateRestaurant)


// registering consumer user
router.post("/register", validInfo, userController.createBasicUser);



// page to send out email to register restaurant
router.post("/register/restaurant_registration_email", userController.restaurantRegistrationEmail);


// check for registration token
router.post("/register/valid_token", userController.validRegistrationToken);


// page for restaurant registration
router.post("/register/restaurant_registration", validInfoRestaurant, restaurantController.registerRestaurant)



// ADD USER TO RESTAURANT
router.post("/restaurant/add_user", restaurantController.addExistingUserToRestaurant)



// creating new user asssociated to restaurant
router.post("/register/user_to_restaurant", restaurantController.addUserToRestaurant)



// login
router.post("/login", login, userController.login)



// token validation
router.get("/is_verified", authorization, async (req, res) => {
    try {
        console.log(req.user)
        console.log("SuCcEs");
        return res.json(req.user)
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not authorized")
    };
});



// logout
router.delete("/logout", logout, async (req, res) => {
    try {
        console.log("SuCcEs");
        
        return res.sendStatus(204)
    } catch (err) {
        console.error(err.message);
    }
})


// password reset
router.post("/reset_password", userController.passwordResetEmail)


// password reset link validation
router.post("/reset_password/valid_token", userController.validPasswordResetToken)


// reset password
router.post("/reset_password/set_password", userController.resetPassword)


// remove user from restaurant
router.post("/remove_user/:id/:email", authorization, restaurantController.removeUserFromRestaurant)

// toggling restaurant visibility
router.post("/toggle_visibility", authorization, restaurantController.toggleRestaurantVisibility)

module.exports = router;
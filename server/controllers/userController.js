const db = require('../models');
const {Op} = require('sequelize')

const User = db.User;
const Restaurant = db.Restaurant;
const Roles = db.Roles;
const Follower = db.Follower;
const Menu = db.Menu;
const SpecialEvent = db.SpecialEvent;

const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');


// loading user profile page
const loadProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Restaurant
            }]
        })

        if (user) {
            return res.json({valid: true, user})
        }
    } catch (err) {
        console.error(err.message)
        return res.json(false)
    }
}

// creating consumer user
const createBasicUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(403).json("Email already registered");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword
        });

        const role = await Roles.findOne({
            where: {
                role: "basic"
            }
        });

        await newUser.addRoles(role);

        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
}

// email for new user registering restaurant account
const restaurantRegistrationEmail = async (req, res) => {
    try {
        
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(401).json("user already exists");
        };

        const token = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        const link = `http://localhost:3001/register_restaurant/${token}`;
        
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "crystalcoastdining@gmail.com",
                pass: "zsbdxqbnydtjefat"
            }
        });

        var mailOptions = {
            from: "crystalcoastdining@gmail.com",
            to: req.body.email,
            subject: "Restaurant Registration",
            headers: {
                "token": token
            },
            text: `Please visit ${link} to register your restaurant at Crystal Coast Curated. This link is valid for 15 minutes.`
        };
        console.log("hi")
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error.message)
            } else {
                console.log(success)
            }
        })

        return res.status(200).json("Success")
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
}

// checking for registration email token
const validRegistrationToken = async (req, res) => {
    try {
        const jwtToken = req.body.token;
        const valid = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);

        console.log(valid)
        
        const user = await User.create({
            email: valid.email
        });

        console.log(user)
        const role = await Roles.findOne({
            where: {
                role: "restaurant"
            }
        });

        await user.addRoles(role);
        console.log(user)
        if (valid) {
            return res.json({valid: true, user});
        }

    } catch (err) {
        return res.json({valid: false});
    }
}

// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({
            where: {
                email: email
            },
            include: [{
                model: Roles
            }, {
                model: Restaurant
            }]
        });
        
        // edit to only make 1 call to user table
        
        if (!user) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const token = jwtGenerator(user.id);

        const userInfo = await User.findOne({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            },
            where: {
                email: email
            },
            include: [{
                model: Roles
            }, {
                model: Restaurant
            }]
        });

        return res.json({token, userInfo, followedRestaurants});

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
}

// email for password reset
const passwordResetEmail = async (req, res) => {
    try {
        // const user = await User.findOne({
        //     where: {
        //         email: req.body.email
        //     }
        // });

        const token = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

        const link = `http://localhost:3001/reset_password/${token}`;
        
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "crystalcoastdining@gmail.com",
                pass: "zsbdxqbnydtjefat"
            }
        });

        var mailOptions = {
            from: "crystalcoastdining@gmail.com",
            to: req.body.email,
            subject: "Password Reset",
            headers: {
                "token": token
            },
            text: `Please visit ${link} to reset your password at Crystal Coast Curated. This link is valid for 15 minutes.`
        };
        console.log("hi")
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error.message)
            } else {
                console.log(success)
            }
        })

        return res.json(true)
    } catch (err) {
        console.error(err.message)
    }
}

// checking for password reset email token
const validPasswordResetToken = async (req, res) => {
    try {
        const jwtToken = req.body.token;
        const valid = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findOne({
            where: {
                email: valid.email
            } 
        });

        user.set({
            password: null
        });
        await user.save();

        if (valid) {
            return res.json({valid: true, user});
        }

    } catch (err) {
        return res.json({valid: false});
    }
}

// reset password
const resetPassword = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.findOne({
            where: {
                email: req.header("email")
            }
        })

        await user.set({
            password: hashedPassword
        })

        await user.save();

        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message);
    }
}

// sending a message from Contact Us page
const contactUsMessage = async (req, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "crystalcoastdining@gmail.com",
                pass: "zsbdxqbnydtjefat"
            }
        });

        var mailOptions = {
            from: "crystalcoastdining@gmail.com",
            to: "crystalcoastdining@gmail.com",
            subject: "Contact Us Message",
            text: `${req.body.name} - ${req.body.typeOfCustomer}\n${req.body.email}\n\n${req.body.message}`
        };

        var mailOptionsToCustomer = {
            from: "crystalcoastdining@gmail.com",
            to: req.body.email,
            subject: "Contact Us Message",
            text: `This is an automated confirmation email. \nYou sent the following message to crystalcoastdining@gmail.com: 
                    \n\n${req.body.message} \n\n We will reach out to you as soon as we are able. Thank you.`
        };

        console.log("hi")
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error.message)
            } else {
                console.log(success)
            }
        })

        transporter.sendMail(mailOptionsToCustomer, (error, info) => {
            if (error) {
                console.error(error.message)
            } else {
                console.log(success)
            }
        })
        return res.json("success")
    } catch (err) {
        console.error(err.message);
    }
}

// load users followed restaurants
const followedRestaurants = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        const restaurants = await user.getFollower()

        let listOfRestaurants = []

        restaurants.forEach(restaurant => {
            listOfRestaurants.push(Number(restaurant.id))
        })
        
        const allRestaurants = await Restaurant.findAll({
            where: {
                id: listOfRestaurants
            },
            include: [{
                model: Menu}, {
                model: SpecialEvent
            }]
        })

        
        
        return res.json(allRestaurants)
    } catch (err) {
        console.error(err.message)
    }
    
}

module.exports = {
    loadProfile,
    createBasicUser,
    restaurantRegistrationEmail,
    validRegistrationToken,
    login,
    passwordResetEmail,
    validPasswordResetToken,
    resetPassword,
    contactUsMessage,
    followedRestaurants
}
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



// registering consumer user
router.post("/register", validInfo, async (req, res) => {
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
});




// page to send out email to register restaurant
router.post("/register/restaurant_registration_email", async (req, res) => {
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
                pass: "mfevkjqtruweikfa"
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
});




// check for registration token
router.post("/register/valid_token", async (req, res) => {
    try {
        const jwtToken = req.body.token;
        const valid = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.create({
            email: valid.email
        });

        const role = await Roles.findOne({
            where: {
                role: "restaurant"
            }
        });

        await user.addRoles(role);

        if (valid) {
            return res.json({valid: true, user});
        }

    } catch (err) {
        return res.json({valid: false});
    }
});




// page for restaurant registration
router.post("/register/restaurant_registration", validInfoRestaurant, async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                restaurant_name: req.body.restaurant_name
            }
        });

        if (restaurant) {
            return res.status(401).json("Restaurant already exists");
        }

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

        const newRestaurant = await Restaurant.create({
            restaurant_name: req.body.restaurant_name
        })

        await newRestaurant.addUser(user)

        for (let i = 0; i < 7; i++) {
            let newRestaurantHours = await Hours.create({
                weekday: i,
                restaurantId: newRestaurant.id
            })
            await newRestaurantHours.save();
        }
        // const newRestaurantHours = await Hours.create({
        // })

        // await newRestaurantHours.save();
        
        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message);
    }
})



// ADD USER TO RESTAURANT
router.post("/restaurant/add_user", async (req, res) => {
    try {

        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.restaurant
                }
            });
        

        if (user) {
            const restaurantUserExist = await Restaurant.findOne({
                where: {
                    id: req.body.restaurant
                }, include: {
                    model: User, where: { id: user.id }
                }
            });

            const role = await Roles.findOne({
                where: {
                    role: "restaurant"
                }
            });

            if (restaurantUserExist) {
                return res.json("already associated");
            } else {
                restaurant.addUser(user)
                user.addRoles(role)
                return res.json('yoho')
            }
        }
        
        // if user does not have an account
        else {
            const token = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            // NEED TO STORE RESTAURANT NAME IN LINK
            const link = `http://localhost:3001/register/${restaurant.id}/${token}`;
            
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "crystalcoastdining@gmail.com",
                    pass: "mfevkjqtruweikfa"
                }
            });

            var mailOptions = {
                from: "crystalcoastdining@gmail.com",
                to: req.body.email,
                subject: "Account Registration",
                headers: {
                    "token": token
                },
                text: `You have been invited to be an admin on ${restaurant.restaurant_name}'s account. Please visit ${link} to register your account at Crystal Coast Curated. This link is valid for 15 minutes.`
            };
            console.log("hi")
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error.message)
                } else {
                    console.log(success)
                }
            })
        } 

    } catch (err) {
        console.error(err.message)
    }
})



// creating new user asssociated to restaurant
router.post("/register/user_to_restaurant", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.header("email")
            }
        })
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await user.set({
            password: hashedPassword
        })

        await user.save();

        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.restaurant
            }
        })

        await restaurant.addUser(user)
        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message);
    }
})




// login
router.post("/login", login, async (req, res) => {
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
        
        
        if (!user) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const token = jwtGenerator(user.id);

        return res.json({token, user});

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})





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
router.post("/reset_password", async (req, res) => {
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
                pass: "mfevkjqtruweikfa"
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
})


// password reset link validation
router.post("/reset_password/valid_token", async (req, res) => {
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
})


// reset password
router.post("/reset_password/set_password", async (req, res) => {
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
})


// remove user from restaurant
router.post("/remove_user/:id/:email", authorization, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.id
            }
        });
        console.log("found it")

        await restaurant.removeUser(user);

        const userRole = await User.findOne({
            where: {
                email: req.body.email
            }, include: {
                model: Roles,
                where: {
                    role: "restaurant"
                }
            }
        });
        
        if (userRole) {
            const role = await Roles.findOne({
                where: {
                    role: "restaurant"
                }
            })

            await role.removeUser(user)

            return res.status(200).json("Success")
        }

        console.log("it worked")
        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;
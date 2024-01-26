const db = require('../models');
const fs = require('fs');

const Restaurant = db.Restaurant;
const User = db.User;
const Roles = db.Roles;
const Hours = db.Hours;
const SpecialEvent = db.SpecialEvent;
const Follower = db.Follower;
const Menu = db.Menu;
const RestaurantImages = db.RestaurantImages;

const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// image upload
const multer = require('multer');
const path = require('path');

// upload image controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/ProfileImage')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb("Give proper file format to upload")
    }
}).single('profileImage')

// getting all restaurants for display
const getRestaurants = async (req, res) => {
    try {
        console.log(req.query.weekday)

        if (req.query.towns !== undefined && req.query.time !== "") {
            const potentialRestaurants = await Hours.findAll({
                where: {
                    weekday: req.query.weekday
                }
            })
            let ids = []
            for (let i = 0; i < potentialRestaurants.length; i++) {
                if (potentialRestaurants[i].openHour === "Closed" || potentialRestaurants[i] === null) {

                } else if (Number(potentialRestaurants[i].openHour) < Number(req.query.time) && Number(potentialRestaurants[i].closeHour) > Number(req.query.time)) {
                    potentialRestaurants[i].openStatus = true
                    ids.push(potentialRestaurants[i].RestaurantId)
                }
            }
            const restaurants = await Restaurant.findAll({
                where: {
                    id: ids,
                    town: req.query.towns,
                    isVisible: true,
                    isActive: true
                },
                order: [ ['restaurantName', 'ASC'] ]
            })
            return res.json(restaurants)
        } 
        
        else if (req.query.towns !== undefined) {
            console.log("test2")
            const restaurants = await Restaurant.findAll({
                where: {
                    town: req.query.towns,
                    isVisible: true,
                    isActive: true
                },
                order: [ ['restaurantName', 'ASC'] ]
            });
            return res.json(restaurants)
        } 
        
        else if (req.query.time !== "") {
            const potentialRestaurants = await Hours.findAll({
                where: {
                    weekday: req.query.weekday
                }
            })
            let ids = []
            for (let i = 0; i < potentialRestaurants.length; i++) {
                if (potentialRestaurants[i].openHour === "Closed" || potentialRestaurants[i] === null) {

                } else if (Number(potentialRestaurants[i].openHour) < Number(req.query.time) && Number(potentialRestaurants[i].closeHour) > Number(req.query.time)) {
                    potentialRestaurants[i].openStatus = true
                    ids.push(potentialRestaurants[i].RestaurantId)
                }
            }
            const restaurants = await Restaurant.findAll({
                where: {
                    id: ids,
                    isVisible: true,
                    isActive: true
                },
                order: [ ['restaurantName', 'ASC'] ]
            })
            return res.json(restaurants)
        } 
        
        else {
            const restaurants = await Restaurant.findAll({
                where: {
                    isVisible: true,
                    isActive: true
                },
                order: [ ['restaurantName', 'ASC'] ]
            })
            return res.json(restaurants)
        }
        
    } catch (err) {
        console.log('try again')
    }
}

// getting specific restaurant page
const getRestaurantPage = async (req, res) => {
    try {
        
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Menu, 
                    order: [ ['pageNumber', 'ASC'] ]}, {
                model: SpecialEvent
            }]
        });

        const hours = await Hours.findAll({
            where: {
                RestaurantId: req.params.id
            },
            order:[ ["weekday", "ASC"] ]
        })

        const images = await RestaurantImages.findAll({
            where: {
                RestaurantId: req.params.id
            }
        })

        if (req.query.user !== undefined) {
            const followed = await Follower.findOne({
                where: {
                    RestaurantId: req.params.id,
                    UserId: req.query.user
                }
            })
            
            if (followed) {
                return res.json({valid: true, restaurant, hours, images});
            }
        }
        
        
        if (restaurant) {
            return res.json({valid: false, restaurant, hours, images});
        };
    
    } catch (err) {
        console.log('try again')
        return res.json(false)
    }
}

// registering restaurant account
const registerRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                restaurantName: req.body.restaurantName
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
            restaurantName: req.body.restaurantName
        })

        await newRestaurant.addUser(user)

        for (let i = 0; i < 7; i++) {
            let newRestaurantHours = await Hours.create({
                weekday: i,
                RestaurantId: newRestaurant.id
            })
            await newRestaurantHours.save();
        }
        
        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message);
    }
}

// adding existing user to restaurant account
const addExistingUserToRestaurant = async (req, res) => {
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
                    pass: "zsbdxqbnydtjefat"
                }
            });

            var mailOptions = {
                from: "crystalcoastdining@gmail.com",
                to: req.body.email,
                subject: "Account Registration",
                headers: {
                    "token": token
                },
                text: `You have been invited to be an admin on ${restaurant.restaurantName}'s account. Please visit ${link} to register your account at Crystal Coast Curated. This link is valid for 15 minutes.`
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
}

// adding new user to restaurant account
const addUserToRestaurant = async (req, res) => {
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
}

// removing user from restaurant account
const removeUserFromRestaurant = async (req, res) => {
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
        
        await restaurant.removeUser(user);

        const usersRestaurants = await user.getRestaurants()
        if (usersRestaurants.length === 0) {
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

                const basicRole = await Roles.findOne({
                    where: {
                        role: "basic"
                    }
                })
                await user.removeRoles(role)
                await user.addRoles(basicRole)

                return res.status(200).json("Success")
            }
        }

        

        console.log("it worked")
        return res.status(200).json("Success")
    } catch (err) {
        console.error(err.message)
    }
}

// getting restaurant edit page for assigned users
const getUserRestaurantPage = async (req, res) => {
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

        const restaurant = await Restaurant.findOne({
            where: {
                id: req.params.RestaurantId
            },
            include: {
                model: RestaurantImages
            }
        })

        if (validUser || validAdmin) {
            return res.json({valid: true, restaurant});
        }

        return res.json({valid: false});
    } catch (err) {
        console.error(err.message);
    }
}

// updating restaurant contact info
const updatingRestaurantContactInfo = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.id
            }
        });

        const updatedRestaurant = await restaurant.set({
            streetAddress: req.body.streetAddress,
            town: req.body.town,
            phoneNumber: req.body.phoneNumber
        });

        await updatedRestaurant.save();
        return res.json(req.user);
    } catch (err) {
        console.error(err.message)
    }
}

// updating restaurant additional info
const updatingRestaurantAdditionalInfo = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.id
            }
        });

        const updatedRestaurant = await restaurant.set({
            website_url: req.body.website_url,
            facebook_url: req.body.facebook_url,
            instagram_url: req.body.instagram_url,
            description: req.body.description

        });

        await updatedRestaurant.save();
        return res.json(req.user);
    } catch (err) {
        console.log("FUCK")
        console.error(err.message)
    }
}

// adding a profile image
const addProfileImage = async (req, res) => {
    try {
        console.log(req.body)
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.id
            }
        });

        if (restaurant.profileImage && req.body.noImage === true) {
            fs.unlinkSync(`${restaurant.profileImage}`)
        }

        if (req.body.noImage === false) {
            return res.json(req.user);
        } else {
            const updatedRestuarant = await restaurant.set({
                profileImage: req.file.path
            });
            await updatedRestuarant.save();
            return res.json(req.user);
        }
    } catch (err) {
        console.error(err.message)
    }
}

// creating restaurant account as an admin
const adminCreateRestaurant = async (req, res) => {
    try {
        const isAdmin = await User.findOne({
            where: {
                id: req.body.id
            }, include: {
                model: Roles, where: {role: "admin"}
            }
        })

        if (isAdmin) {
            const restaurant = await Restaurant.create({
                restaurantName: req.body.restaurantName
            })

            for (let i = 0; i < 7; i++) {
                let newRestaurantHours = await Hours.create({
                    weekday: i,
                    RestaurantId: restaurant.id
                })
                await newRestaurantHours.save();
            }

            
            return res.json("nice")
        }
        return res.json("no good")
    } catch (err) {
        console.error(err.message)
    }
}

// admin page all restaurants/users
const adminAllRestaurantsAndUsers = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            include: {
                model: User
            },
            order: [ ['restaurantName', 'ASC'] ]
        })

        if (req.query.role !== undefined) {
            const users = await User.findAll({
                include: {
                    model: Roles,
                    attributes: ['role'],
                    where: {
                        role: req.query.role
                    }
                },
                order: [ ['email', 'ASC'] ]
            })

            return res.json({restaurants, users})
        }

        const users = await User.findAll({
            include: {
                model: Roles,
                attributes: ['role']
            },
            order: [ ['email', 'ASC'] ]
        })
        console.log(1);
        return res.json({restaurants, users});
    } catch (err) {
        console.error(err.message);
    }
}

// initial information form for restaurant
// NEED TO COMPLETE THIS 9/12/2023
const initialInformationForm = async (req, res) => {
    try {

        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.id
            }
        });

        let initialInfo = {
            streetAddress: req.body.streetAddress,
            town: req.body.town,
            phoneNumber: req.body.phoneNumber,
            mealTimes: req.body.mealTimes,
            websiteURL: req.body.websiteURL,
            facebookURL: req.body.facebookURL,
            instagramURL: req.body.instagramURL,
            description: req.body.description,
            profileImage: req.file.path,
            isActive: true,
            isVisible: true
        }
        console.log(req.body)
        
        const updatedRestaurant = await restaurant.set(initialInfo);
        
        console.log(restaurant)
        

        const sundayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
                weekday: 0
            }
        });
        const mondayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
                weekday: 1
            }
        });
        const tuesdayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
                weekday: 2
            }
        });
        const wednesdayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
                weekday: 3
            }
        });
        const thursdayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
                weekday: 4
            }
        });
        const fridayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
                weekday: 5
            }
        });
        const saturdayHours = await Hours.findOne({
            where: {
                RestaurantId: req.body.id,
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
        await updatedRestaurant.save();
        return res.json("did this work?")
    } catch (err) {
        console.error(err.message)
    }
}

// toggling restaurant visiblity
const toggleRestaurantVisibility = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id: req.body.id
            }
        })

        const updatedRestaurant = await restaurant.set({
            isVisible: !req.body.isVisible
        })
        await updatedRestaurant.save();

        return res.json("this would be cool")
    } catch (err) {
        console.error(err.message)
    }
}


module.exports = {
    getRestaurants,
    getRestaurantPage,
    getUserRestaurantPage,
    updatingRestaurantContactInfo,
    updatingRestaurantAdditionalInfo,
    adminAllRestaurantsAndUsers,
    adminCreateRestaurant,
    registerRestaurant,
    addExistingUserToRestaurant,
    addUserToRestaurant,
    removeUserFromRestaurant,
    upload,
    addProfileImage,
    initialInformationForm,
    toggleRestaurantVisibility,
    // followRestaurant
}
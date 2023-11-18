const db = require('../models');
const fs = require('fs');

const Follower = db.Follower
const Restaurant = db.Restaurant;
const User = db.User;

// following a restaurant
const followRestaurant = async (req, res) => {
    try {
        const follow = await Follower.create({
            UserId: req.body.userId,
            RestaurantId: req.body.restaurantId
        })

        return res.json("it worked")
    } catch (err) {
        console.error(err.message)
    }
}

// unfollowing restaurant
const unfollowRestaurant = async (req, res) => {
    try {
        const unfollow = await Follower.findOne({
            where: {
                RestaurantId: req.params.restaurantId,
                UserId: req.params.userId
            }
        })

        await unfollow.destroy();

        return res.json("also worked")
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    followRestaurant,
    unfollowRestaurant
}
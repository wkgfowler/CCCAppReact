const db = require('../models');

const Restaurant = db.Restaurant;
const User = db.User;
const RestaurantImages = db.RestaurantImages;
const Roles = db.Roles;

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/RestaurantImages')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb("Give proper file format to upload")
    }
}).array("restaurantImages", 9)

const restaurantImagesUpload = async (req, res) => {
    try {
        const files = req.files;
        for (let i = 0; i < files.length; i++) {
            const restaurantImage = RestaurantImages.create({
                RestaurantId: req.body.RestaurantId,
                image: files[i].path
            })
        }

        return res.json("woohoo")
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    upload,
    restaurantImagesUpload
}
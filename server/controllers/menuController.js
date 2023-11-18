const db = require('../models');
const fs = require('fs');
const crypto = require('crypto');

const Restaurant = db.Restaurant;
const User = db.User;
const Menu = db.Menu;
const Roles = db.Roles;

//image upload
const multer = require('multer')
const path = require('path')

// upload menu controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/Menus')
    },
    filename: (req, file, cb) => {
        // necessary to avoid images sharing the same filename if uploaded too quickly
        const randomString = crypto.randomBytes(16).toString('hex')
        cb(null, randomString + path.extname(file.originalname))
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
}).array("menuImage", 8)

// actual uploading of menu images
const menuUpload = async (req, res) => {
    try {
        console.log(req.body)
        const files = req.files
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            const menu = await Menu.create({
                RestaurantId: req.body.RestaurantId,
                menuType: req.body.menuType,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                everyday: req.body.everyday,
                sunday: req.body.sunday,
                monday: req.body.monday,
                tuesday: req.body.tuesday,
                wednesday: req.body.wednesday,
                thursday: req.body.thursday,
                friday: req.body.friday,
                saturday: req.body.saturday,
                menuImage: files[i].path,
                pageNumber: req.body.pageNumber[i]
            })
            console.log(menu)
        }

        return res.json("great success")
    } catch (err) {
        console.error(err.message)
    }
};

// getting menus for edit page
const getMenusForEdit = async (req, res) => {
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

        const menus = await Menu.findAll({
            where: {
                RestaurantId: req.params.RestaurantId
            },
            order: [ ['pageNumber', 'ASC'] ]
        })

        if (validUser || validAdmin) {
            return res.json({valid: true, menus});
        }

        return res.json({valid: false});
    } catch (err) {
        console.error(err.message);
    }
}

// loading specific menu for edit page
const getSpecificMenuForEdit = async (req, res) => {
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

        const menus = await Menu.findAll({
            where: {
                RestaurantId: req.params.RestaurantId,
                menuType: req.params.typeOfMenu
            },
            order: [ ['pageNumber', 'ASC'] ]
        })

        if (validUser || validAdmin) {
            return res.json(menus);
        }

        return res.json({valid: false});
    } catch (err) {
        console.error(err.message);
    }
}

// deleting menu image
const deleteMenuImage = async (req, res) => {
    try {
        const menu = await Menu.findOne({
            where: {
                id: req.params.id
            }
        })

        fs.unlinkSync(`${menu.menuImage}`)

        await Menu.destroy({
            where: {
                id: req.params.id
            }
        })
        
        return res.json("Success")
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    upload,
    menuUpload,
    getMenusForEdit,
    getSpecificMenuForEdit,
    deleteMenuImage
}

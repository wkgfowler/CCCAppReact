const db = require('../models');

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
}).array("menuImage", 8)

// actual uploading of menu images
const menuUpload = async (req, res) => {
    try {
        console.log(req.body)
        const files = req.files
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
                menuImage: files[i].path
            })
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
            }
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
            }
        })

        if (validUser || validAdmin) {
            return res.json(menus);
        }

        return res.json({valid: false});
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    upload,
    menuUpload,
    getMenusForEdit,
    getSpecificMenuForEdit,
}

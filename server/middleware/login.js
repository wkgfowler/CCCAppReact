require('dotenv').config();
const {User, Token} = require('../models');
const app = require('../server');
const jwtRefreshGenerator = require('../utils/jwtRefreshGenerator');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {

        // consolidate with userController.login

        const {email, password} = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const token = await Token.findOne({
            where: {
                userId: user.id
            }
        })

        if (token) {
            return res.status(403).json("Token Invalid")
        }

        const refreshToken = Token.build({
            token: jwtRefreshGenerator(user.id),
            userId: user.id
        });
        
        await refreshToken.save();

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json("Invalid User")
    }
}
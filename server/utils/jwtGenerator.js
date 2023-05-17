const jwt = require('jsonwebtoken');
require("dotenv").config();

function jwtGenerator(userId) {
    const payload = {
        user : userId
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

module.exports = jwtGenerator;
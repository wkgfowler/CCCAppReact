const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtRefreshGenerator(userId) {
    const payload = {
        user: userId
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = jwtRefreshGenerator;
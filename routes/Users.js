const errors = require('restify-errors');
const User = require('../models/User');

module.exports = server => {
    // Register User
    server.post('/register', (req, res, next) => {
        const {email, password} = req.body;

        const user = new User({
            email,
            password
        });
    });
}
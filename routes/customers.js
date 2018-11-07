const errors = require('restify-errors');
const Customer = require('../models/Customers');

module.exports = (server) => {
    // Get Customers
    server.get('/customers', async (req, res, next) => {
        
        try {
            const customers = await Customer.find({});
            res.send(customers);
            next();

        }
        catch(err) {
            return next(new errors.InvalidContentError(err));
        }
    });
}
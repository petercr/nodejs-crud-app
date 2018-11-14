const errors = require("restify-errors");
const Customer = require("../models/Customers");
const config = require('../config');

module.exports = server => {
  // Get Customers
  server.get("/customers", async (req, res, next) => {
    try {
      const customer = await Customer.find({});
      res.send(customer);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });

  // Get single customers
  server.get("/customers/:id", async (req, res, next) => {
    try {
      const customers = await Customer.findById(req.params.id);
      res.send(customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Add customer
  server.post("/customers", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { name, email, balance } = req.body;

    const customer = new Customer({
      name,
      email,
      balance
    });

    try {
      const newCustomer = await customer.save();
      res.send(201);
      console.log(customer);
      next();
    } catch (err){
      return next(new errors.InternalError(err.message));
    }
  });

  // Update customer
  server.put("/customers/:id", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.send(200);
      next();
    } catch (err){
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });

  // Delete customer
  server.del("/customers/:id", async (req, res, next) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });
};

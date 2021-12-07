const express = require("express");

const shopRoutes = require("./shopRoutes");
const ExpressError = require("./expressError")

const app = express();

app.use(express.json());
app.use("/items", shopRoutes);

// 404 Handler
app.use(function (req,res, next) {
    return new ExpressError("Not Found", 404);
});

// Generic Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
      error: err.msg,
    });
});



module.exports = app;
const rateLimiter = require("express-rate-limit");

exports.limiter = rateLimiter({
    max: 100,
    windowMS: 60*1000,
    message: "You can't make any more requests at the moment. Try again later",
});

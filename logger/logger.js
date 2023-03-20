const logger = (req, res, next) => {
    console.log("Middleware baina");
    req.miniiNer = "Azure baina";
    next();
};

module.exports = logger;
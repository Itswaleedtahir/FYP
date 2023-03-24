const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/country");
const checkCountry = require("../middleware/check_country.js");
const citiesRouter = require("./city");

router.get("/", controller.getAll);
router.use("/:countryId/cities", checkCountry, citiesRouter);
module.exports = router;

const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const countryRouter = require("./country");
const adminRouter = require("./admin");

router.use("/users", userRouter);
router.use("/countries", countryRouter);
router.use("/admins", adminRouter);

module.exports = router;

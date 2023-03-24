const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/city");

router.get("/", controller.get);

module.exports = router;

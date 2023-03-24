const { Router } = require("express");
const router = Router();

const controller = require("../controllers/admin");
const organizationRouter = require("./organization");
const isAdmin = require("../middleware/is_admin");

router.post("/logIn", controller.logIn);
router.use("/:adminId/organizations", isAdmin, organizationRouter);
router.post("/logIn", controller.logIn);
router.put("/:adminId/verifyOtp", isAdmin, controller.verifyOtp);
module.exports = router;

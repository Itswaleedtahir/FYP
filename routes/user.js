const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");
const authenticateUser = require("../middleware/authenticate_user");
const isUser = require("../middleware/is_user");
const postRouter = require("./post");
const organizationRouter = require("./organization");

router.post("/signUp", controller.signUp);
router.post("/logIn", controller.logIn);
router.put("/:userId", authenticateUser, controller.update);
router.put("/:userId/verifyOtp", isUser, controller.verifyOtp);
router.post("/:userId/resendOtp", isUser, controller.resendOtp);
router.use("/:userId/posts", isUser, authenticateUser, postRouter);
router.put(
  "/:userId/changeAvailability",
  isUser,
  authenticateUser,
  controller.changeAvailability
);
router.use("/:userId/posts", authenticateUser, postRouter);
router.use(
  "/:userId/organizations",
  isUser,
  authenticateUser,
  organizationRouter
);

module.exports = router;

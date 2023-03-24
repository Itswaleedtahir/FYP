const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/post");
const isPost = require("../middleware/is_post");
const checkPost = require("../middleware/check_post");

router.post("/", controller.create);
router.get("/", controller.getPending);
router.put("/:postId", isPost, checkPost, controller.changeStatus);
router.post("/:postId/donate", isPost, controller.donate);

module.exports = router;

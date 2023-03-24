const { Router } = require("express");
const router = Router();

const controller = require("../controllers/organization");

const isOrganization = require("../middleware/is_organization");
const isOrganizationHead = require("../middleware/is_organization_head");
const isOrganizationMember = require("../middleware/is_organization_member");

router.post("/", controller.create);
router.post(
  "/:organizationId/addMember",
  isOrganization,
  isOrganizationMember,
  isOrganizationHead,
  controller.addMember
);
module.exports = router;

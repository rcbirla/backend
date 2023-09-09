const router = require("express").Router();

router.use("/user", require("../routes/user.routes"));
router.use("/project", require("../routes/project.routes"));

module.exports = router;

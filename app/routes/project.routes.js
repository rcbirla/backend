const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const project = require("../controllers/project.controller");

router.get("/", authMiddleware("user"), project.getAll);
router.get("/:projectId", authMiddleware("user"), project.get);
router.post("/", authMiddleware("user"), project.create);
router.patch("/:projectId", authMiddleware("user"), project.update);

module.exports = router;

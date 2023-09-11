const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const project = require("../controllers/project.controller");

router.get("/", authMiddleware(), project.getAll);
router.get("/:projectId", authMiddleware(), project.get);
router.post("/", authMiddleware(), project.create);
router.patch("/:projectId", authMiddleware("superuser"), project.update);

module.exports = router;

const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const user = require("../controllers/user.controller");

router.post("/register", authMiddleware("superuser"), user.register);
router.post("/login", user.login);
router.get("/me", authMiddleware(), user.getMe);
router.patch("/update", authMiddleware(), user.update);

module.exports = router;

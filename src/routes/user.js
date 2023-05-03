const user = require("../controllers/user.controller");
var router = require("express").Router();
const auth = require("./verifyjwttoken");

router.post("/register", user.registration);
router.post("/hp", auth, user.addHP);
router.get("/", user.getUsers);
router.get("/:id", auth, user.getUserById);
router.post("/login", user.userLogin);
router.get("/check", auth, user.checkToken);
router.get("/logout", auth, user.userLogout);
router.put("/", auth, user.update);
router.delete("/destroy", auth, user.destroy);
// router.get("/hp", auth, user.getAllHp);
// router.get("/hp/get/:id", auth, user.existHp);
// router.get("/hp/add/:id", auth, user.addHp);

// router.get("/", user.getUsers);
module.exports = router;

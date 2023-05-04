const profile = require("../controllers/profile.controller");
var router = require("express").Router();
const auth = require("./verifyjwttoken");
router.get("/get", auth, profile.getProfile);
router.post("/post", auth, profile.create);
router.delete("/", auth, profile.delete);
module.exports = router;

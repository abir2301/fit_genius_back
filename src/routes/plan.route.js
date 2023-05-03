const plan = require("../controllers/plan.controller");
var router = require("express").Router();
const auth = require("./verifyjwttoken");

router.post("/", auth, plan.create);
module.exports = router;

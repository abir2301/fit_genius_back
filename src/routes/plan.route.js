const plan = require("../controllers/plan.controller");
var router = require("express").Router();
const auth = require("./verifyjwttoken");

router.post("/", auth, plan.create);
router.get("/performance", auth, plan.getPerformance);
router.get("/", auth, plan.get);

module.exports = router;

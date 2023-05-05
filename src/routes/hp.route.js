const hp  = require("../controllers/hp.controller");
var router = require("express").Router();
const auth = require("./verifyjwttoken");
// admin can create new hp or even auth user 

router.get("/update/:id", hp.update);
router.get("/delete/:id", hp.delete);
router.get("/", hp.getAllHp);
router.post("/" , hp.create);


module.exports = router;

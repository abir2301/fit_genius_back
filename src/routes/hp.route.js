const hp  = require("../controllers/hp.controller");
var router = require("express").Router();
const auth = require("./verifyjwttoken");
// admin can create new hp or even auth user 
router.get("/", hp.getAllHp);
router.get("/get/:id", hp.getHp);
router.get("/new" , hp.create);
router.get("/user/new",auth, hp.create);
router.get("/update/:id", hp.update);
router.get("/delete/:id", hp.delete);

module.exports = router;

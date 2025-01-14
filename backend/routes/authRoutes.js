const router = require("express").Router();

const {registerControler,loginControler} = require("../controlers/authControler.js");

router.post("/register", registerControler)
router.post("/login", loginControler)

module.exports = router;
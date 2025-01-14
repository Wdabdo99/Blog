const router = require("express").Router();
const { verifyToken } = require("../meddielweer/verifyToken.js");
const {addCommmentControler,getAllCommmentControler,deleteCommmentControler,updateCommmentControler}
= require("../controlers/commentControler.js");

router.post("/",verifyToken, addCommmentControler)
router.get("/",verifyToken, getAllCommmentControler)
router.put("/:id",verifyToken, updateCommmentControler)
router.delete("/:id",verifyToken, deleteCommmentControler)

module.exports = router;
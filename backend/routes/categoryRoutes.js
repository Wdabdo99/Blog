const router = require("express").Router();
const { verifyToken } = require("../meddielweer/verifyToken.js");
const {
    addCategoryControler,
    getAllCategoriesControler,
    deleteCategoryControler
} = require("../controlers/categoryControler.js");

router.post("/", verifyToken, addCategoryControler);
router.get("/", getAllCategoriesControler);
router.delete(`/`, verifyToken, deleteCategoryControler);

module.exports = router;

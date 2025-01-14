const router = require("express").Router();

const { verifyToken } = require("../meddielweer/verifyToken.js");
const  uploadPhoto  = require("../meddielweer/photoUpload.js");

const {
    getAllUsersControler,
    getUserControler,
    getcountusersControler,
    updateUserControler,
    deleteUserControler,
    uploadImageUserControler
} = require("../controlers/userControler.js");

router.get("/", verifyToken, getAllUsersControler);
router.get("/:id", verifyToken, getUserControler);
router.get("/count",verifyToken, getcountusersControler);
router.put("/:id", verifyToken, updateUserControler);
router.post(
    "/upload_image",
    verifyToken,
    uploadPhoto.single("image"),
    uploadImageUserControler
);
router.delete("/:id", verifyToken, deleteUserControler);

module.exports = router;

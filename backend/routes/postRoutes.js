const router = require("express").Router();

const  uploadPhoto  = require("../meddielweer/photoUpload.js");

const { verifyToken } = require("../meddielweer/verifyToken.js");

const {
    newPostControler,
    getAllPostsControler,
    getPostControler,
    updatePostControler,
    deletePostControler,
    likesPostControler
} = require("../controlers/postControler.js");

router.post("/", verifyToken,uploadPhoto.single("image") ,newPostControler);
router.get("/", getAllPostsControler);
router.get("/:id", getPostControler);
router.put("/:id", verifyToken, uploadPhoto.single("image"),updatePostControler);
router.put("/like/:id", verifyToken,likesPostControler);
router.delete("/:id", verifyToken ,deletePostControler);

module.exports = router;

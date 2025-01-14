const {
    Post,
    newPostValidate,
    updatePostValidate
} = require("../models/post.js");
const { User } = require("../models/user.js");
const { Comment } = require("../models/comment.js");
const fs = require("fs");

const path = require("path");

const { uploadImage, deleteImage } = require("../utiles/cloudinary.js");

/**
 * @desc add new post
 * @route api/posts
 * @METHOD POST
 * access private(only user himsalf)
 */

module.exports.newPostControler = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "dont have image please add your image profile "
            });
        }

        const { error } = newPostValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const imagePath = path.join(
            __dirname,
            `../images/${req.file.filename}`
        );
        const result = await uploadImage(imagePath);

        const newPost = await Post.create({
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            postImage: result.secure_url,
            publicId: result.public_id,
            userId: req.user.id
        });

        res.status(200).json({ message: "post created", ...newPost });
        fs.unlinkSync(imagePath);
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

/**
 * @desc get ALL posts
 * @route api/posts
 * @METHOD GET
 * access public
 */

module.exports.getAllPostsControler = async (req, res) => {
    try {
        const posts = await Post.findAll();

        /*if (!posts) {
            return res.status(404).json({ message: "not found" });
        }*/
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

/**
 * @desc get post
 * @route api/posts:id
 * @METHOD GET
 * access public
 */

module.exports.getPostControler = async (req, res) => {
    try {
        const posts = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [Comment]
        });

        if (!posts) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

/**
 * @desc update post
 * @route api/posts:id
 * @METHOD PUT
 * access private(only user himsalf)
 */

module.exports.updatePostControler = async (req, res) => {
    try {
        if (req.user.id !== parseInt(req.params.id)) {
            return res.status(401).json({ message: "only user himsalf " });
        }
        const { error } = updatePostValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!post) {
            return res.status(404).json({ message: "user not found" });
        }

        if (req.file) {
            await deleteImage(post?.public_id);
            const imagePath = path.join(
                __dirname,
                `../images/${req.file.filename}`
            );
            const result = await uploadImage(imagePath);
            post.postImage = result.secure_url;
            post.publicId = result.public_id;
            fs.unlinkSync(imagePath);
        }
        if (req.body.title) {
            post.title = req.body.title;
        }
        if (req.body.desc) {
            post.desc = req.body.desc;
        }
        if (req.body.category) {
            post.category = req.body.category;
        }
        await post.save();

        res.status(200).json({ message: "post updated", ...post });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

/**
 * @desc delete post
 * @route api/posts:id
 * @METHOD DELETE
 * access private(only user himsalf)
 */

module.exports.deletePostControler = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include :[Comment]
        });

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        if (req.user.id !== parseInt(post.userId)) {
            return res.status(401).json({ message: "only user himsalf " });
        }
        // delete post
        if (post.publicId) {
            await deleteImage(post.publicId);
        }

        if (post.comments.length > 0) {
            await Comment.destroy({
                where: {
                    postId: req.params.id
                }
            });
        }

        await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({ message: "post deleted" });
    } catch (error) {
        res.status(500).json({ message: "internal " });
    }
};

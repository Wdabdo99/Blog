const { User, updateUserValidate } = require("../models/user.js");
const { Post } = require("../models/post.js");
const { Comment } = require("../models/comment.js");
const fs = require("fs");

const path = require("path");

const { uploadImage, deleteImage } = require("../utiles/cloudinary.js");

const bcrypt = require("bcryptjs");

/**
 * @desc get all users and count's
 * @route api/users
 * @METHOD GET
 * access private(only admin user)
 */
module.exports.getAllUsersControler = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "user is not admin" });
        }
        const users = await User.findAll();

        if (!users) {
            return res.status(404).json({ message: "not found" });
        }
        const count = users.length;

        res.status(200).json({ ...users, count });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

/**
 * @desc get count users
 * @route api/users/count
 * @METHOD GET
 * access private(only admin user)
 */
module.exports.getcountusersControler = async (req, res) => {
    try {
        const count = await User.count();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json(
            {
                message: "internal server error"
            },
            { error }
        );
    }
};

/**
 * @desc get profile user
 * @route api/users/:id
 * @METHOD GET
 * access private(only user himsalf)
 */
module.exports.getUserControler = async (req, res) => {
    try {
        if (req.user.id != req.params.id) {
            return res.status(401).json({ message: "only user himsalf" });
        }
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: [Post]
        });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "internal server" });
    }
};

/**
 * @desc update profile user
 * @route api/users/:id
 * @METHOD PUT
 * access private(only user himsalf)
 */
module.exports.updateUserControler = async (req, res) => {
    try {
        if (req.user.id != req.params.id) {
            return res.status(401).json({ message: "only user himsalf" });
        }
        const { error } = updateUserValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const salt = await bcrypt.genSalt(10);

        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.password) {
            const hashPassword = await bcrypt.hash(req.body?.password, salt);
            user.password = hashPassword;
        }
        await user.save();

        res.status(200).json({ message: "profile updated" });
    } catch (error) {
        res.status(500).json({ message: "internal " });
    }
};

/**
 * @desc get profile user
 * @route api/users/:id
 * @METHOD DELETE
 * access private(only user himsalf or admin)
 */

module.exports.deleteUserControler = async (req, res) => {
    try {
        if (req.user.id != req.params.id) {
            return res.status(401).json({ message: "only user himsalf " });
        }

        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        await Comment.destroy({
            where: {
                userId: req.user.id
            }
        });
        await Post.destroy({
            where: {
                userId: req.user.id
            }
        });
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (user.publicId !== null) {
            await deleteImage(user.publicId);
        }

        res.status(200).json({ message: "profile deleted" });
    } catch (error) {
        res.status(500).json({ message: "internal " });
    }
};

/**
 * @desc upload image profile
 * @route api/users/upload_image
 * @METHOD POST
 * access private(only user himsalf)
 */

module.exports.uploadImageUserControler = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "dont have image please add your image profile "
            });
        }
        const imagePath = path.join(
            __dirname,
            `../images/${req.file.filename}`
        );
        const result = await uploadImage(imagePath);

        const user = await User.findOne({ where: { id: req.user.id } });

        if (user.publicId !== null) {
            await deleteImage(user.publicId);
        }

        user.profilePhoto = result.secure_url;
        user.publicId = result.public_id;

        await user.save();

        res.status(200).json({
            message: "your profile photo uploaded successfully",
            profilePhoto: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });
        fs.unlinkSync(imagePath);
    } catch (error) {
        res.status(500).json({ message: "internal " });
    }
};

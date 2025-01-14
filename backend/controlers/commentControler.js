const { Comment, newCommentValidate } = require("../models/comment.js");

/**
 * @desc add new comment
 * @route api/comments
 * @METHOD POST
 * access private(only user himsalf)
 */

module.exports.addCommmentControler = async (req, res) => {
    try {
        const { error } = newCommentValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newComment = await Comment.create({
            text: req.body.text,
            userId: req.user.id,
            postId: req.query.postId
        });
        res.status(200).json({ message: "comment created", ...newComment });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @desc get all comments
 * @route api/comments
 * @METHOD GET
 * access private(only admin)
 */

module.exports.getAllCommmentControler = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(404).json({ message: "only admin" });
        }

        const comments = await Comment.findAll();

        if (!comments) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @desc delete comment
 * @route api/comments/:id
 * @METHOD DELETE
 * access private(only user himsalf or admin)
 */

module.exports.deleteCommmentControler = async (req, res) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } });

        if (!comment) {
            return res.status(404).json({ message: "not found" });
        }
        console.log(comment.userId);
        console.log(req.user.id);
        if (req.user.id == comment.userId || req.user.isAdmin) {
           await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        }
        else {
            return res
                .status(404)
                .json({ message: "only user himsalf or admin" });
        }
            
        res.status(200).json({ message: "comment deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @desc update comment
 * @route api/comments/:id
 * @METHOD PUT
 * access private(only user himsalf)
 */

module.exports.updateCommmentControler = async (req, res) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } });

        if (!comment) {
            return res.status(404).json({ message: "not found" });
        }
        if (req.user.id != comment.userId) {
            return res.status(404).json({ message: "only user himsalf" });
        }
        if (req.body.text) {
            comment.text = req.body.text;
        }
        await comment.save();

        res.status(200).json({ message: "comment updated", ...comment });
    } catch (error) {
        res.status(500).json(error);
    }
};

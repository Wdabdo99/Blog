const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connect.js");
const joi = require("joi");
const { Post } = require("../models/post.js");
const { Comment } = require("../models/comment.js");

const User = sequelize.define("user", {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 100
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 3,
            max: 100,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
            "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
    },
    publicId: DataTypes.STRING,
    bio: {
        type: DataTypes.STRING
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isAccountVeriyied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
User.hasMany(Post, {
    foreignKey: "userId"
});
Post.belongsTo(User, { targetKey: "id" });

User.hasMany(Comment, {
    foreignKey: "userId"
});
Comment.belongsTo(User, { targetKey: "id" });

Post.hasMany(Comment, {
    foreignKey: "userId"
});
Comment.belongsTo(Post, { targetKey: "id" });

/*(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();*/

function registerValidate(obj) {
    const validate = joi.object({
        username: joi.string().trim().max(100).min(3).required(),
        email: joi.string().trim().max(100).min(5).required().email(),
        password: joi.string().trim().min(6).required()
    });
    return validate.validate(obj);
}
function loginValidate(obj) {
    const validate = joi.object({
        email: joi.string().trim().max(100).min(5).required().email(),
        password: joi.string().trim().min(6).required()
    });
    return validate.validate(obj);
}

function updateUserValidate(obj) {
    const validate = joi.object({
        username: joi.string().trim().max(100).min(3),
        password: joi.string().trim().min(6)
    });
    return validate.validate(obj);
}
module.exports = {
    User,
    registerValidate,
    loginValidate,
    updateUserValidate
};

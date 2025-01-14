const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connect.js");
const joi = require("joi");

const Post = sequelize.define("post", {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 5,
            max: 100
        }
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 100
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postImage: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    publicId: DataTypes.STRING,

    likes: {
        type: DataTypes.BOOLEAN
    }
});

/*(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();*/
function newPostValidate(obj) {
    const validate = joi.object({
        title: joi.string().trim().max(100).required(),
        desc: joi.string().trim().required(),
        category: joi.string().trim().required()
    });
    return validate.validate(obj);
}

function updatePostValidate(obj) {
    const validate = joi.object({
        title: joi.string().trim().max(100).min(5),
        desc: joi.string().trim().min(10),
        category: joi.string().trim()
    });
    return validate.validate(obj);
}

module.exports = {
    Post,
    newPostValidate,
    updatePostValidate
};

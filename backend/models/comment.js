const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connect.js");

const joi = require("joi");

const Comment = sequelize.define("comment", {
    // Model attributes are defined here
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100
        }
    }
    
});

/*(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();*/
function newCommentValidate(obj) {
    const validate = joi.object({
        text: joi.string().trim().max(100).required(),
    });
    return validate.validate(obj);
}

module.exports = {
    Comment,newCommentValidate
};

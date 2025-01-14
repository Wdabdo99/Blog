const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connect.js");

const joi = require("joi");

const Category = sequelize.define("category", {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3
        }
    }
});

/*(async () => {
    await sequelize.sync({ force: true });
    // Code here
})();*/
function newCategoryValidate(obj) {
    const validate = joi.object({
        title: joi.string().trim().max(100).min(2).required()
    });
    return validate.validate(obj);
}

module.exports = {
    Category,
    newCategoryValidate
};

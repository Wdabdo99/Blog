const { Category, newCategoryValidate } = require("../models/category.js");

/**
 * @desc add new category
 * @route api/category
 * @METHOD POST
 * access private(only admin user)
 */

module.exports.addCategoryControler = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "user is not admin" });
        }
        const { error } = newCategoryValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const category = await Category.findOne({
            where: {
                title: req.body.title
            }
        });

        if (category) {
            return res
                .status(400)
                .json({ message: "category is already exsist" });
        }
        const newCategory = await Category.create({
            title: req.body.title
        });
        res.status(200).json({ message: "category created", ...newCategory });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @desc get all categories
 * @route api/category
 * @METHOD GET
 * access public
 */

module.exports.getAllCategoriesControler = async (req, res) => {
    try {
        const categories = await Category.findAll();

        if (!categories) {
            return res.status(404).json({ message: "not found" });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

/**
 * @desc DELETE CATEGORY
 * @route api/category
 * @METHOD DELETE
 * access private(only admin user)
 */

module.exports.deleteCategoryControler = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "user is not admin" });
        }

        const category = await Category.findOne({
            where: {
                title: req.query.title
            }
        });

        if (!category) {
            return res
                .status(400)
                .json({ message: "category not found" });
        }
        await Category.destroy({
            where: {
                title: req.query.title
            }
        });

        res.status(200).json({ message: "category deleted" });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};

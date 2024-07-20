const asyncHandler = require("../middleware/asyncHandler");
const Categories = require("../models/productCategoriesModel");

// @Desc Add Product Category
// @route POST /api/products/addcategory
// @access Private/Admin
const addCategory = asyncHandler(async (req, res) => {
  const { name, subCategoryName } = req.body;
  const category = new Categories({
    name,
    subCategory: [
      {
        name: subCategoryName,
      },
    ],
  });

  const newCategory = await category.save();

  if (newCategory) {
    res.status(200).json(newCategory);
  } else {
    res.status(500);
    throw new Error("unable to add category");
  }
});

// @desc Get Categories
// @route GET /api/products/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find({});
  res.json(categories);
});

// @Desc Delete a Category
// @route Delete /api/category/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Categories.findById(req.params.id);

  if (category) {
    await Categories.deleteOne({ _id: category._id });
    res.status(200).json({ message: "Category deleted" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

module.exports = { getCategories, addCategory, deleteCategory };

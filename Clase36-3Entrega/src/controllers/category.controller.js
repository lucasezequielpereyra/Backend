import Category from "../models/category.model";

export const newCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.json({
      message: "Category created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      categories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

import * as categoryService from "../services/category.service";

export const newCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await categoryService.newCategory({ name });
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
    const categories = await categoryService.getCategories();
    res.json({
      categories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

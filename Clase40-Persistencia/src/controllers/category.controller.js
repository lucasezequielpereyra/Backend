import CategoryService from '../services/category.service';
import Category from '../class/category.class';

let categoryService = null;

switch (process.env.PERSISTANCE) {
  case 'MONGO':
    categoryService = new CategoryService();
    break;
  case 'MYSQL':
    productService = null; // implement mysql
  default:
    break;
}

export const CategoryController = {
  async newCategory(req, res) {
    try {
      const { name } = req.body;
      const categoryObj = new Category(name);
      await categoryService.findByName(categoryObj.name);

      res.json({
        message: 'Category created successfully',
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async getCategories(req, res) {
    try {
      const categories = await categoryService.findAll();
      res.json({
        categories,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

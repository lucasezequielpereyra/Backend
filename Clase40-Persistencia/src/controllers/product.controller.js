import ProductService from '../services/product.service';
import CategoryService from '../services/category.service';
import Product from '../class/product.class';

let productService = null;
let categoryService = null;

switch (process.env.PERSISTANCE) {
  case 'MONGO':
    categoryService = new CategoryService();
    productService = new ProductService();
    break;
  case 'MYSQL':
    productService = null; // implement mysql
  default:
    break;
}

export const ProductController = {
  async newProduct(req, res) {
    try {
      const { img, name, price, stock, description, category } = req.body;
      const productObj = new Product(img, name, price, stock, description);

      if (category) {
        const foundCategory = await categoryService.findByName(category);
        if (foundCategory.length !== 0) {
          productObj.setCategory(foundCategory[0]._id);
        } else {
          throw new Error('Invalid category');
        }
      } else {
        throw new Error('Category is required');
      }

      await productService.newProduct(productObj);
      res.json({
        message: 'Product created successfully',
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async getProducts(req, res) {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};

export default ProductController;

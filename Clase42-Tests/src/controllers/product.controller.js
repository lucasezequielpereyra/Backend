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
        if (foundCategory !== null) {
          productObj.setCategory(foundCategory._id);
        } else {
          throw new Error('Invalid category');
        }
      } else {
        throw new Error('Category is required');
      }

      const product = await productService.newProduct(productObj);
      res.json({
        message: 'Product created successfully',
        data: product,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async getProducts(req, res) {
    try {
      const products = await productService.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async editProduct(req, res) {
    try {
      const { id } = req.params;
      const { img, name, price, stock, description, category } = req.body;
      const productObj = new Product(img, name, price, stock, description);

      if (category) {
        const foundCategory = await categoryService.findByName(category);
        if (foundCategory !== null) {
          productObj.setCategory(foundCategory._id);
        } else {
          throw new Error('Invalid category');
        }
      } else {
        throw new Error('Category is required');
      }

      const productEdited = await productService.editProduct(id, productObj);
      res.json({
        message: 'Product updated successfully',
        data: productEdited,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const productDeleted = await productService.deleteProduct(id);
      res.json({
        message: 'Product deleted successfully',
        data: productDeleted,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default ProductController;

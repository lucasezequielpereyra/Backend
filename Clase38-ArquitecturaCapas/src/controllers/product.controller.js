import * as productService from "../services/product.service";
import * as categoryService from "../services/category.service";

export const newProduct = async (req, res) => {
  try {
    const { img, name, price, stock, description, category } = req.body;
    let product = { img, name, price, stock, description };

    if (category) {
      const foundCategory = await categoryService.findByName(category);
      if (foundCategory.length !== 0) {
        product.category = foundCategory[0]._id;
      } else {
        throw new Error("Invalid category");
      }
    } else {
      throw new Error("Category is required");
    }

    await productService.newProduct(product);
    res.json({
      message: "Product created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

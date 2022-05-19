import Product from "../models/product.model";
import Category from "../models/category.model";

export const newProduct = async (req, res) => {
  try {
    const { img, name, price, stock, description, category } = req.body;
    const product = new Product({
      img,
      name,
      price,
      stock,
      description,
      category,
    });

    if (category) {
      const foundCategory = await Category.find({ name: category });
      if (foundCategory.length !== 0) {
        product.category = foundCategory[0]._id;
      } else {
        throw new Error("Invalid category");
      }
    } else {
      throw new Error("Category is required");
    }

    await product.save();
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
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

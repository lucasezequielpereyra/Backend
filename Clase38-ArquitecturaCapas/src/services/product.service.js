import ProductModel from "../models/product.model";

export const findByProducts = async (products) => {
  return await ProductModel.find({ _id: { $in: products } });
};

export const newProduct = async (product) => {
  return await ProductModel.create(product);
};

export const getProducts = async () => {
  return await ProductModel.find();
};

import CategoryModel from "../models/category.model";

export const findByName = async (categoryName) => {
  return await CategoryModel.find({ name: categoryName });
};

export const newCategory = async (category) => {
  return await CategoryModel.create(category);
};

export const getCategories = async () => {
  return await CategoryModel.find();
};

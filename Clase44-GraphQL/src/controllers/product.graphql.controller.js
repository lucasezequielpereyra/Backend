import ProductService from '../services/product.service';

export const getProducts = async () => {
  const productService = new ProductService();
  const products = await productService.findAll();
  return products;
};

export const addProduct = async product => {
  const productService = new ProductService();
  const newProduct = await productService.newProduct(product);
  return newProduct;
};

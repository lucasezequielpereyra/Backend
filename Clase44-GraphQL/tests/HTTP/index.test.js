const axios = require('axios');

let url = 'http://localhost:8080';

// utils
const productTest = {
  img: 'https://via.placeholder.com/200x200',
  name: 'Producto Prueba',
  price: 999,
  stock: 1,
  description: 'prueba',
  category: 'Test',
};

const editProduct = {
  img: 'https://via.placeholder.com/200x200',
  name: 'Producto Prueba editado',
  price: 9999,
  stock: 12,
  description: 'prueba_editado',
  category: 'Test',
};

// functions
const listProducts = async url => {
  try {
    console.log('Listando productos');
    const response = await axios.get(url + /product/);
    return console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (url, product) => {
  try {
    console.log('Agregando producto');
    const response = await axios.post(url + '/product/add', product);
    return console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const editProductTest = async (url, product, id) => {
  try {
    console.log('Editando producto');
    const response = await axios.put(url + '/product/' + id, product);
    return console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (url, id) => {
  try {
    console.log('Borrando producto');
    const response = await axios.delete(url + '/product/' + id);
    return console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// execute functions
//listProducts(url);
//addProduct(url, productTest);
//editProductTest(url, editProduct, '629ffb40ad63d9add01adc65');
//deleteProduct(url, '629ffb40ad63d9add01adc65');

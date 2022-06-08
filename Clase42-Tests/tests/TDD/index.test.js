const { strictEqual, deepStrictEqual } = require('assert');
const axios = require('axios');
const request = require('supertest');

// utils
url = 'http://localhost:8080';
let idToEdit = null;

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

// test
describe('check server', function () {
  before(function () {
    request(url)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it('list products', async function () {
    console.log('listing products');
    const response = await axios.get(url + /product/);

    //console.log(numeros, numeros.length)
    strictEqual(response.data.length, 4);
    deepStrictEqual(response.data, [
      {
        _id: '628550cacf63265e3d067feb',
        img: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2021/11/macbook-pro-14-m1-pro-2538075.jpg?itok=Yiw0kkc5',
        name: 'Macbook Pro',
        price: 999,
        stock: 5,
        description: 'Macbook Pro M1 2022',
        category: '62854c02b12bf285907084a3',
        createdAt: '2022-05-18T20:02:18.555Z',
        updatedAt: '2022-05-18T20:02:18.555Z',
      },
      {
        _id: '628551fdcf63265e3d067fee',
        img: 'https://i0.wp.com/hipertextual.com/wp-content/uploads/2021/11/macbook-air-scaled.jpeg?fit=2560%2C1707&quality=50&strip=all&ssl=1',
        name: 'Macbook Air',
        price: 799,
        stock: 8,
        description: 'Macbook Air M1 2022',
        category: '62854c02b12bf285907084a3',
        createdAt: '2022-05-18T20:07:25.842Z',
        updatedAt: '2022-05-18T20:07:25.842Z',
      },
      {
        _id: '628552b833df0162f675f4fe',
        img: 'https://http2.mlstatic.com/D_NQ_NP_742994-MLA41924232047_052020-O.jpg',
        name: 'Escritorio Tipo Industrial',
        price: 299,
        stock: 15,
        description: 'Escritorio tipo industrial para pc',
        category: '62854c1cb12bf285907084a7',
        createdAt: '2022-05-18T20:10:32.641Z',
        updatedAt: '2022-05-18T20:10:32.641Z',
      },
      {
        _id: '628552fc33df0162f675f501',
        img: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/117/621/products/arg-470_1000x1000-21-1b2d6be4c876f8f01c15839504398756-640-0.jpg',
        name: 'Cinta fija para correr',
        price: 499,
        stock: 8,
        description: 'Cinta corredora',
        category: '62854c15b12bf285907084a5',
        createdAt: '2022-05-18T20:11:40.428Z',
        updatedAt: '2022-05-18T20:11:40.428Z',
      },
    ]);
  });

  it('add product', async function () {
    console.log('adding product');
    const response = await axios.post(url + '/product/add', productTest);
    deepStrictEqual(response.data.message, 'Product created successfully');
    idToEdit = response.data.data._id;
  });

  it('edit product', async function () {
    console.log('editing product');
    const response = await axios.put(url + '/product/' + idToEdit, editProduct);
    deepStrictEqual(response.data.message, 'Product updated successfully');
  });

  it('delete product', async function () {
    console.log('deleting product');
    const response = await axios.delete(url + '/product/' + idToEdit);
    deepStrictEqual(response.data.message, 'Product deleted successfully');
  });
});

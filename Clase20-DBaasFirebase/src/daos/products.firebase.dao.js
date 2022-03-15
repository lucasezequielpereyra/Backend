import FirebaseContainer from '../class/firebase.container';

class ProductFirebaseDao extends FirebaseContainer {
  constructor() {
    super('products');
  }

  async createProductDao(name, price, img) {
    const newProduct = {
      name: name,
      price: price,
      //img: img
    };
    try {
      let doc = this.collection.doc();
      return await doc.create(newProduct);
    } catch (error) {
      return error;
    }
  }

  async updateProductDao(id, name, price, img) {
    try {
      const doc = this.collection.doc(id);
      return await doc.update({
        name: name,
        price: price,
        //img: img,
      });
    } catch (error) {}
  }
}

export default ProductFirebaseDao;

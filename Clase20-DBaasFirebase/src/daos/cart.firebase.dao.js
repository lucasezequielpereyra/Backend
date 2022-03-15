import FirebaseContainer from '../class/firebase.container';
const now = Date;

class CartFirebaseDao extends FirebaseContainer {
  constructor() {
    super('carts');
  }

  async createCartDao() {
    try {
      let doc = this.collection.doc();
      return await doc.create();
    } catch (error) {
      return error;
    }
  }

  async deletePrductById(idCart, idProduct) {
    try {
      console.log('updated cart firebase');
    } catch (error) {
      return error;
    }
  }

  async updateCartDao(idCart, idProduct) {
    try {
      const doc = this.collection.doc(idCart);
      return await doc.update({
        products: idProduct,
      });
    } catch (error) {
      return error;
    }
  }
}

export default CartFirebaseDao;

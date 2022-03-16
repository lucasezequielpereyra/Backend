import FirebaseContainer from '../class/firebase.container';
const now = Date;
import admin from 'firebase-admin';

class CartFirebaseDao extends FirebaseContainer {
  constructor() {
    super('carts');
  }

  async createCartDao() {
    try {
      let doc = this.collection.doc();
      return await doc.create({ id: doc.id, timestamp: now() });
    } catch (error) {
      return error;
    }
  }

  async deletePrductById(idCart, idProduct) {
    try {
      const doc = this.collection.doc(idCart);
      return await doc.update({
        products: admin.firestore.FieldValue.arrayRemove(idProduct),
      });
    } catch (error) {
      return error;
    }
  }

  async updateCartDao(idCart, idProduct) {
    try {
      const doc = this.collection.doc(idCart);
      return await doc.update({
        products: admin.firestore.FieldValue.arrayUnion(idProduct),
      });
    } catch (error) {
      return error;
    }
  }
}

export default CartFirebaseDao;

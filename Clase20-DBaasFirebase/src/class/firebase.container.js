import admin from 'firebase-admin';

const serviceAccount = require('../firebase.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
} finally {
  console.log('firebase db is connected');
}

class FirebaseContainer {
  constructor(db) {
    this.collection = admin.firestore().collection(db);
  }

  async listAll() {
    try {
      const snapshot = await this.collection.get();
      let docs = snapshot.docs;
      const response = docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
      }));
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      return await this.collection.doc(`${id}`).delete();
    } catch (error) {
      console.error(error);
    }
  }
}

/*
  TEST 
  
const f = new FirebaseContainer('products');


const foo = async () => {
  await f.listAll();
};

const foo = async () => {
  await f.deleteById('6LP0yxkGpIVpIGFuVi06');
};

foo();


*/

export default FirebaseContainer;

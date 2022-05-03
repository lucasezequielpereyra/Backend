import logger from './winston';
import AuthorsDao from './daos/authors.dao';
import MessagesDao from './daos/messages.dao';
import ProductsDao from './daos/products.dao';

const authorDao = new AuthorsDao();
const messageDao = new MessagesDao();
const productsDao = new ProductsDao();

export const socket = async io => {
  try {
    io.on('connection', async socket => {
      console.log('Cliente conectado');

      // First List Check
      const dataProducts = await productsDao.listAll();
      socket.emit('firstUpdate', dataProducts);

      const dataMsg = await messageDao.listMessages();
      socket.emit('firstUpdateMsg', dataMsg);

      // Add Product
      socket.on('newProduct', async data => {
        const { name, price } = data;
        await productsDao.createPorudctDao(name, price);

        const allPrd = await productsDao.listAll();
        io.sockets.emit('updateOk', allPrd); // Update table products
      });

      // Add Msg
      socket.on('newMsg', async data => {
        const { name, lastName, age, alias } = data[0];
        const { text } = data[1];

        const auth = await authorDao.createAuthorDao(
          name,
          lastName,
          age,
          alias,
        );
        const id = auth._id;
        await messageDao.createMessageDao(id, text);

        const dataMsg = await messageDao.listMessages();

        io.sockets.emit('updateMsgOk', dataMsg);
      });
    });
  } catch (err) {
    logger.error.error(err);
  }
};

const socket = io.connect();

// First Check
socket.on('firstUpdate', data => {
  updateListProducts(data);
});

socket.on('firstUpdateMsg', data => {
  updateListMsg(data);
});

// Add Products Function
const addProd = () => {
  let data = {
    name: document.querySelector('#input-name').value,
    price: document.querySelector('#input-price').value,
  };
  socket.emit('newProduct', data);
};

// Listen Products
socket.on('updateOk', data => {
  updateListProducts(data);
});

socket.on('updateMsgOk', data => {
  updateListMsg(data);
});

// Update List Products Function
const updateListProducts = data => {
  let html = data
    .map(obj => {
      return `
				<div class='cart-item'>
					<img src=${obj.img} alt='Imagen Producto' />
					<span>
						${obj.name}
					</span>
					<span>
						$${obj.price}
					</span>
				</div>
			`;
    })
    .join(' ');
  document.querySelector('#tableProducts').innerHTML = html;
};

// Add Msg Function
const addMsg = () => {
  let dataUser = {
    name: document.querySelector('#input-userName').value,
    lastName: document.querySelector('#input-lastName').value,
    age: document.querySelector('#input-age').value,
    alias: document.querySelector('#input-alias').value,
  };

  let dataMessage = {
    text: document.querySelector('#input-message').value,
  };
  socket.emit('newMsg', [dataUser, dataMessage]);
};

// Update Msg Function
const updateListMsg = dataMsg => {
  let html = dataMsg
    .map(msg => {
      return `
        <div class="container">
          <img src=${msg.author[0].avatar} alt='Avatar'>
          <p> <span class='user'>${msg.author[0].alias} </span>: ${msg.text} </p>
          <span class="time"> ${msg.timestamps} </span>
        </div>
      `;
    })
    .join(' ');
  document.querySelector('#containerMessages').innerHTML = html;
};

// Web Iteraction
document.querySelector('#form').addEventListener('submit', function (e) {
  e.preventDefault();
  addProd();
  this.reset();
});

document.querySelector('#formMsg').addEventListener('submit', function (e) {
  e.preventDefault();
  addMsg();
  this.reset();
});

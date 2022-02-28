const socket = io.connect();

// First Check
socket.on("firstUpdate", (data) => {
  updateListProducts(data);
});

socket.on("firstUpdateMsg", (data) => {
  updateListMsg(data);
});

// Add Products Function
const addProd = () => {
  let data = {
    name: document.querySelector("#input-name").value,
    price: document.querySelector("#input-price").value,
  };
  socket.emit("newProduct", data);
};

// Listen Products
socket.on("updateOk", (data) => {
  updateListProducts(data);
});

socket.on("updateMsgOk", (data) => {
  updateListMsg(data);
});

// Update List Products Function
const updateListProducts = (data) => {
  let html = data
    .map((obj) => {
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
    .join(" ");
  document.querySelector("#tableProducts").innerHTML = html;
};

// Add Msg Function
const addMsg = () => {
  let data = {
    email: document.querySelector("#input-email").value,
    text: document.querySelector("#input-msg").value,
  };
  socket.emit("newMsg", data);
};

// Update Msg Function
const updateListMsg = (data) => {
  let html = data
    .map((obj) => {
      return `
			<div class="container">
				<img src='https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png' alt='Avatar'>
				<p> <span class='user'> ${obj.email}</span>: ${obj.text} </p>
				<span class="time"> ${obj.created_at} </span>
			</div>
		`;
    })
    .join(" ");
  document.querySelector("#containerMessages").innerHTML = html;
};

// Web Iteraction
document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
  addProd();
  this.reset();
});

document.querySelector("#formMsg").addEventListener("submit", function (e) {
  e.preventDefault();
  addMsg();
  this.reset();
});

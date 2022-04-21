"use strict";

process.on("message", function (cantidad) {
  var contador = 0;
  var aleatorio = Math.floor((Math.random() + 1) * cantidad.cantidad);

  for (var i = 0; i < aleatorio; i++) {
    contador++;
  }

  process.send({
    cantidad: contador
  });
});
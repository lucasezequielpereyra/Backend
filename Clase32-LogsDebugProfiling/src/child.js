process.on( "message", (cantidad) => {
    let contador = 0;
    const aleatorio = Math.floor((Math.random() + 1) * cantidad.cantidad);
    for( let i = 0; i < aleatorio; i++){
        contador++
    }
    process.send({ cantidad: contador })
})
// Socket comunica con servidor
const socket = io();

//AGREGAR
const agregarForm = document.getElementById('carritoForm');

agregarForm.addEventListener('submit', (e) => {
    e.preventDefault();

        const carritoId = document.getElementById('carrito').value;
        const productoId = document.getElementById('producto').value;
    

    if (carritoId && productoId) {
        const nuevoProducto = {
            id: productoId, // Utiliza el ID del producto
            quantity: 1 // Inicializa la cantidad en 1
        };

        // Enviar el nuevo producto al servidor a través de sockets
    socket.emit('agregarCarro', {carritoId, producto: nuevoProducto});
    
    console.log(nuevoProducto);


    // Limpiar los campos de entrada
    agregarForm.reset();
}else{
    console.log("no hay producto a agregar")
}

});


socket.on('showCarts', data => {
    container.innerHTML = ``

    data.forEach(cart => {
        container.innerHTML += '<ul>';
        cart.products.forEach(product => {
            container.innerHTML += `
                <li>Product ID: ${product._id}</li>
                <li>Quantity: ${product.quantity}</li>
            `;
        });
        container.innerHTML += `<li>Cart ID: ${cart._id}</li></ul>`;
    });
});





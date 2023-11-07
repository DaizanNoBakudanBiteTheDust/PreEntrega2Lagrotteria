// Socket comunica con servidor
const socket = io();

const carritoId = '6548f637d8891916f4b7065b';

async function addProduct(pid) {
    try {
         // Realiza la solicitud al servidor para obtener el carrito
         const response = await fetch(`/api/carts/${carritoId}`);

         if (!response.ok) {
             throw new Error('Error en la solicitud al servidor');
         }
         // Convierte el cuerpo de la respuesta en un objeto JSON
         const data = await response.json();
 
         const cartData = data.payload;
 
         // Buscar el producto en el carrito por el ID del producto
         const existingProductIndex = cartData.products.find(p => p.product._id.toString() === pid);

        if (existingProductIndex) {
            // Si el producto ya existe en el carrito, incrementa la cantidad
            existingProductIndex.quantity += 1;
        } else {
       // Crea un nuevo objeto de producto utilizando el ID del producto
       const addedProduct = {
         product: {
           _id: pid,
           quantity: 1
         }
       };
       
       // Agrega el producto al arreglo "products" del carrito
       cartData.products.push(addedProduct);
       Toastify({
        text: `tu producto ha sido agregado al carrito`,
        gravity: "bottom",
        duration: 3000
    }).showToast();
     }
 
         // Realizar una solicitud fetch para actualizar el carrito
         const updateResponse = await fetch(`/api/carts/${carritoId}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(cartData)
         });
         if (updateResponse.status === 200) {
             console.log('Producto añadido al carrito', cartData);
         };
 
     
    } catch (error) {
        console.log(error);
    }
  }


//acá pondré los productos que me pasa el cliente
const container = document.getElementById('container');

socket.on('showProducts', data => {
    container.innerHTML = ``

    data.forEach(product => {
        container.innerHTML += `
            <ul>
                <li>titulo: ${product.titulo}</li> 
                <li>descripcion: ${product.descripcion}</li>
                <li>code: ${product.code}</li>
                <li>precio: ${product.precio}</li>
                <li>thumbnail: ${product.status}</li>
                <li>stock: ${product.stock}</li>
                <li>category: ${product.category}</li>
                <li>id: ${product._id}</li>
            </ul>
        `
    });

})

console.log("Carrito ID:", carritoId);
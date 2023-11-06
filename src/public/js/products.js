// Socket comunica con servidor
const socket = io();

const carritoId = '6548f637d8891916f4b7065b';


// Función para agregar un producto a un carrito
async function agregarProductoAlCarrito(carritoId) {
    try {
        // Realiza la solicitud al servidor para obtener el carrito
        const response = await fetch(`/api/carts/${carritoId}`);

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }
        // Convierte el cuerpo de la respuesta en un objeto JSON
        const data = await response.json();

        const cartData = data.payload;

        console.log(cartData)
        // Buscar el producto en el carrito por el ID del producto
        const existingProduct = cartData.products.find(p => p.product._id);

        console.log(existingProduct)

    if (existingProduct) {
      // Si el producto ya existe en el carrito, incrementa la cantidad
      existingProduct.quantity += 1;
    } else {
      // Crea un nuevo objeto de producto utilizando el ID del producto
      const addedProduct = {
        product: {
          _id: productoId,
          quantity: 1
        }
      };
      // Agrega el producto al arreglo "products" del carrito
      cartData.products.push(addedProduct);
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
            console.log('Producto añadido al carrito');
            console.log(cartData); // Aquí puedes hacer lo que desees con el carrito actualizado
        };

    } catch (error) {
        console.error('Error:', error.message);
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
                <li><button class="add-to-cart" id="${this._id}">Agregar al Carrito</button></li>
            </ul>
        `
    });
    // Agregar un manejador de eventos a los botones "Agregar al Carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productoId = button.getAttribute('id')
        agregarProductoAlCarrito(carritoId, productoId);
        alert("producto añadido")
      });
    });
})

console.log("Carrito ID:", carritoId);
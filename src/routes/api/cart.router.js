import {
        Router
} from 'express';
// import cartManager from '../../dao/fileManagers/cartManager.js';
import {
        cartsFilePath
} from '../../utils.js';
import Carts from '../../dao/dbManagers/cart.manager.js';

// MANAGER ANTIGUO const manager = new cartManager(cartsFilePath); 

const manager = new Carts(); // por ahora usaremos este

const router = Router();


// traer todos los productos

router.get('/', async (req, res) => {
        try {
                const cart = await manager.getAll();
                res.send({
                        status: 'success',
                        payload: cart
                })
        } catch (error) {
                res.status(500).send({
                        status: 'error',
                        message: error.message
                });

        }
});


router.get('/:cid', async (req, res) => {
        try {
                const {
                        cid
                } = req.params;

                //carrito por ID

                const cart = await manager.getProductById(cid);

                res.send({
                        status: 'success',
                        payload: cart
                })
        } catch (error) {
                res.status(500).send({
                        status: 'error',
                        message: error.message
                });

        }

});

//postea carrito

router.post('/', async (req, res) => {
        try {
                const carts = await manager.getAll();
                // Productos que haremos con Postman
                const cart = req.body;

                // Obtener un array con todos los "id" existentes 
                const existingIds = carts.map(p => p._id);

                if (!cart.products) {
                        // Error del cliente
                        return res.status(400).send({
                                status: 'error',
                                error: 'incomplete values'
                        });
                }

                await manager.save(cart);

                // status success
                return res.send({
                        status: 'success',
                        message: 'product created',
                        cart
                })

        } catch (error) {
                res.status(500).send({
                        status: 'error',
                        message: error.message
                });
        }

});



// postea los productos


router.post('/:cid/products/:pid', async (req, res) => {
        try {
                // utilizo params de carrito y producto
                const {
                        cid
                } = req.params;
                const {
                        pid
                } = req.params; // Convierte pid a número

                //carrito por ID

                const cart = await manager.getProductById(cid);

                if (!cart) {
                        return res.status(404).json({
                                error: 'Carrito no encontrado'
                        });
                }

                // Verifica si el carro está vacío
                if (!cart.products || cart.products.length === 0) {
                        cart.products = []; // Inicializa cart.products como un arreglo vacío
                }

                // Buscar el producto en el carrito por el ID proporcionado
                const carrito = cart.products;

                const existingProduct = carrito.find(product => product._id.equals(pid));

                
                console.log(carrito);
                console.log(existingProduct);

                if (existingProduct) {
                        // Si el producto ya existe, incrementa la cantidad
                        existingProduct.quantity += 1;
                } else {
                        // Crea un nuevo objeto de producto utilizando el ID proporcionado
                        const addedProduct = {
                                id: pid, 
                                quantity: 1
                        };
                        // Agrega el producto al arreglo "products" del carrito
                        cart.products.push(addedProduct);

                }

                // Actualiza el carrito con los cambios
                await manager.update(cid, cart);

                // status success
                return res.send({
                        status: 'success',
                        message: 'product added',
                        cart
                })

        } catch (error) {
                res.status(500).send({
                        status: 'error',
                        message: error.message
                });
        }


});

router.delete('/:cid/products/:pid', async (req, res) => {
        try {
                // utilizo params de carrito y producto
                const {
                        cid
                } = req.params;
                const {
                        pid
                } = req.params; // Convierte pid a número

                //carrito por ID

                const cart = await manager.getProductById(cid);

                if (!cart) {
                        return res.status(404).json({
                                error: 'Carrito no encontrado'
                        });
                }

                // Verifica si el carro está vacío
                if (!cart.products || cart.products.length === 0) {
                        cart.products = []; // Inicializa cart.products como un arreglo vacío
                }

                // Buscar el producto en el carrito por el ID proporcionado
                const carrito = cart.products;

                const existingProduct = carrito.findIndex(product => product._id.equals(pid));

                if (existingProduct !== -1) {
                        // Si el producto ya existe, incrementa la cantidad
                        carrito[existingProduct].quantity -= 1;

                        if (carrito[existingProduct].quantity === 0) {
                                cart.products.splice(existingProduct, 1);
                            }
                } 

                // Actualiza el carrito con los cambios
                await manager.update(cid, cart);

                // status success
                return res.send({
                        status: 'success',
                        message: 'product deleted',
                        cart
                })

        } catch (error) {
                res.status(500).send({
                        status: 'error',
                        message: error.message
                });
        }
});


export default router;
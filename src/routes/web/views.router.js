import {
    Router
} from 'express'
// import { productsFilePath } from '../../utils.js';

//import ProductManager from '../../dao/fileManagers/productManager.js';
import Products from '../../dao/dbManagers/products.manager.js';
import Carts from '../../dao/dbManagers/cart.manager.js';
import Messages from '../../dao/dbManagers/message.manager.js'

const router = Router();

const prodManager = new Products();
const cartManager = new Carts();
const chatManager = new Messages();

router.get('/', async (req, res) => { 
    res.render('home', { products: await prodManager.getAll() });
});

router.get('/realTimeProducts', async (req, res) => { 
    res.render('realTimeProducts', { products: await prodManager.getAll() });
});

router.get('/realTimeCarts', async (req, res) => { 
    res.render('realTimeCarts', { carts: await cartManager.getAll() });
});

router.get('/chat', async (req, res) => { 
    res.render('chat', { chat: await chatManager.getAll() });
});


export default router;
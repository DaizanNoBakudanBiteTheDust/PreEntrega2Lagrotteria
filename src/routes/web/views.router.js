import {
    Router
} from 'express'
// import { productsFilePath } from '../../utils.js';

//import ProductManager from '../../dao/fileManagers/productManager.js';
import Products from '../../dao/dbManagers/products.manager.js';
import Carts from '../../dao/dbManagers/cart.manager.js';
import Messages from '../../dao/dbManagers/message.manager.js'

import {
    productsModel
} from "../../dao/dbManagers/models/products.models.js";

const router = Router();

const prodManager = new Products();
const cartManager = new Carts();
const chatManager = new Messages();

router.get('/', async (req, res) => { 
    // se agregan parametros de paginacion
    const {page = 1} = req.query;
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productsModel.paginate({}, {limit: 10, page, lean: true});
    console.log("hasNextPage:", nextPage);
    console.log("hasPrevPage:", prevPage);
    res.render('home', { 
        products: docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage });
    
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
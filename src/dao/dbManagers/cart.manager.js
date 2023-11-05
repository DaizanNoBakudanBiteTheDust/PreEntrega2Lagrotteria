import { cartsModel } from "./models/carts.models.js";

export default class Carts {
    constructor(){
        console.log("db trabajando")
    }

    getAll = async () => {

        const carts = await cartsModel.find().populate('products').lean();
        console.log(JSON.stringify(carts, null, '\t'));
        return carts;
    }

    save = async (cart) => {
        const result = await cartsModel.create(cart);
        return result;
    }

    update = async (id, cart) => {
        const result = await cartsModel.updateOne({_id : id}, cart);
        return result;
    }

    delete = async (id, cart) => {
        const result = await cartsModel.deleteOne({_id : id}, cart);
        return result;
    }

    getProductById = async (id) => {

        const product = await cartsModel.findOne({ _id: id}).lean();
        
        if (!product) {
            throw new Error('Producto no encontrado');

        } 
        return product;

    }

    getCartById = async (cid) => {
        const cart = await cartsModel
        .findById(cid)
        .populate('products.product')
        .lean();

        console.log(cart)
    
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
    
        return cart;
    }

    deleteProductById = async (id, cart) => {
        const product = await cartsModel.deleteOne({ _id: id}).lean();
        
        if (!product) {
            throw new Error('Producto no encontrado');

        } 
        return product;
    }
}

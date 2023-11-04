import {
    productsModel
} from "./models/products.models.js";

export default class Products {
    constructor() {
        console.log("db trabajando")
    }

    getAll = async () => {

        const products = await productsModel.find().lean();
        return products;
    }

    save = async (product) => {

        const existingProduct = await productsModel.findOne({
            code: product.code
        });

        if (existingProduct) {
           console.log("producto existe con ese codigo");
            };
        
        // se agrega el producto

        const result = await productsModel.create(product);

        return result;
    }

    delete = async (id, product) => {
        const result = await productsModel.deleteOne({_id : id}, product);
        return result;
    }
    getProductById = async (id) => {

        const product = await productsModel.findOne({ _id: id}).lean();
        
        if (!product) {
            throw new Error('Producto no encontrado');

        } 
        return product;


    }
}
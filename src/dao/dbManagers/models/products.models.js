import mongoose from "mongoose";

const productCollection = 'products' // colleccion db

const productsSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: String,
    precio: {
        type: Number,
        required: true
    },
    status: Boolean,
    thumbnail: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: Number,
    category: {
        type: String,
        required: true
    }
})

export const productsModel = mongoose.model(productCollection, productsSchema)
import mongoose from "mongoose";

const cartsCollection = 'carts' // colleccion db

const cartsSchema = new mongoose.Schema({

    products: {

        //Vamos a definir la referencia al a coleccion de cursos:

        type: [{

            product: {

                type: mongoose.Schema.Types.ObjectId,

                ref: "products"

                //Esto significa qu e le pasaremos el ID, es decir el ObjectId del curso, como se llama la referencia? En este caso es “products”

            },

            quantity: {

                type: Number,

                default: 0

            }

        }],

        default: []

    }

});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)
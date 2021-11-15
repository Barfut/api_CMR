import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config({path: './.env'})

const stringConexion = process.env.DATABASE_URL

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let conexion;

const conectarServer = (callback) => {
    client.connect ((err,db) => {
        if (err) {
            console.log('Error al conectar con la base')
            return false
        }
         conexion = db.db('tienda')
         console.log('basedeDatos exitosa')
         return callback();        
    });
};

const getDB = () => {
    return conexion;
}

export { conectarServer , getDB};
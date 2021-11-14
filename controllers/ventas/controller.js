import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllVentas = async (callback) => {
    const conexion = getDB();
    await conexion
    .collection("venta")
    .find({})
    .toArray(callback)
}

const crearVenta = async (datosVentas,callback) => {
    if (Object.keys(datosVentas).includes('fecha') &&
        Object.keys(datosVentas).includes('cedula') &&
        Object.keys(datosVentas).includes('nombre') && 
        Object.keys(datosVentas).includes('producto') && 
        Object.keys(datosVentas).includes('cantidad') && 
        Object.keys(datosVentas).includes('valorUnitario')
        ){  
            const conexion = getDB();
            await conexion.
            collection('venta').
            insertOne(datosVentas, callback)
        } else {
            res.sendStatus(500);
        }
} 
    
const editarVenta  = async (edicion, callback) => {
    const filtroVenta = {_id: new ObjectId(edicion.id)}
    delete edicion.id
    const operacion = {
        $set: edicion,
    }
    const conexion = getDB();
    await conexion
    .collection('venta')
    .findOneAndUpdate(
        filtroVenta, 
        operacion, 
        {upsert: true, returnOriginal:true}, callback)
      
}


export { queryAllVentas , crearVenta, editarVenta}
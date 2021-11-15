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
        Object.keys(datosVentas).includes('valorUnitario') && 
        Object.keys(datosVentas).includes('estado') &&
        Object.keys(datosVentas).includes('vendedor')
        ){  
            const conexion = getDB();
            await conexion.
            collection('venta').
            insertOne(datosVentas, callback)
        } else {
            return 'error'
        }
} 
    
const editarVenta  = async (id, edicion, callback) => {
    const filtroVenta = {_id: new ObjectId(id)}
    
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

const eliminarVentas = async (id, callback) => {
    const filtroVenta = {_id: new ObjectId(id)}
    const conexion = getDB();
    await conexion
    .collection('venta').deleteOne(filtroVenta, callback)
}

const consultarVenta = async (id, callback ) => {
    const conexion = getDB();
    await conexion
    .collection('venta').findOne({_id: new ObjectId(id)} , callback)
}

export { queryAllVentas , crearVenta, editarVenta, eliminarVentas ,consultarVenta}
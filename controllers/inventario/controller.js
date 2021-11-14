import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllInventario = async (callback) => {
    const conexion = getDB();
    await conexion
    .collection('inventario')
    .find({})
    .toArray(callback)
}

const crearInventario = async (datosInventario,callback) => {
    if (Object.keys(datosInventario).includes('fecha') &&
        Object.keys(datosInventario).includes('cedula') &&
        Object.keys(datosInventario).includes('nombre') && 
        Object.keys(datosInventario).includes('producto') && 
        Object.keys(datosInventario).includes('cantidad') && 
        Object.keys(datosInventario).includes('valorUnitario')
        ){  
            const conexion = getDB();
            await conexion.
            collection('inventario').
            insertOne(datosInventario, callback)
        } else {
            res.sendStatus(500);
        }
} 
    
const editarInventario  = async (id, edicion, callback) => {
    const filtroInventario = {_id: new ObjectId(id)}
    
    const operacion = {
        $set: edicion,
    }
    const conexion = getDB();
    await conexion
    .collection('inventario')
    .findOneAndUpdate(
        filtroInventario, 
        operacion, 
        {upsert: true, returnOriginal:true}, callback)
      
}

const eliminarInventario = async (id, callback) => {
    const filtroInventario = {_id: new ObjectId(id)}
    const conexion = getDB();
    await conexion
    .collection('inventario').deleteOne(filtroInventario, callback)
}

const consultarInventario = async (id, callback ) => {
    const conexion = getDB();
    await conexion
    .collection('inventario').findOne({_id: new ObjectId(id)} , callback)
}

export { queryAllInventario , crearInventario, editarInventario, eliminarInventario ,consultarInventario}
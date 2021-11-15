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
    if (Object.keys(datosInventario).includes('producto') && 
        Object.keys(datosInventario).includes('valorUnitario') && 
        Object.keys(datosInventario).includes('estado')
        ){  
            const conexion = getDB();
            await conexion.
            collection('inventario').
            insertOne(datosInventario, callback)
        } else {
            return 'error'
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
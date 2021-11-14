import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion
    .collection('usuario')
    .find({})
    .toArray(callback)
}

const crearUsuario = async (datosUsuarios,callback) => {
    if (Object.keys(datosUsuarios).includes('fecha') &&
        Object.keys(datosUsuarios).includes('cedula') &&
        Object.keys(datosUsuarios).includes('nombre') && 
        Object.keys(datosUsuarios).includes('producto') && 
        Object.keys(datosUsuarios).includes('cantidad') && 
        Object.keys(datosUsuarios).includes('valorUnitario')
        ){  
            const conexion = getDB();
            await conexion.
            collection('usuario').
            insertOne(datosUsuarios, callback)
        } else {
            return 'error'
        }
} 
    
const editarUsuario  = async (id, edicion, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)}
    
    const operacion = {
        $set: edicion,
    }
    const conexion = getDB();
    await conexion
    .collection('usuario')
    .findOneAndUpdate(
        filtroUsuario, 
        operacion, 
        {upsert: true, returnOriginal:true}, callback)
      
}

const eliminarUsuarios = async (id, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)}
    const conexion = getDB();
    await conexion
    .collection('usuario').deleteOne(filtroUsuario, callback)
}

const consultarUsuario = async (id, callback ) => {
    const conexion = getDB();
    await conexion
    .collection('usuario').findOne({_id: new ObjectId(id)} , callback)
}

export { queryAllUsuarios , crearUsuario, editarUsuario, eliminarUsuarios ,consultarUsuario}
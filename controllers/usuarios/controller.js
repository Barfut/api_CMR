import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from "jwt-decode";

const queryAllUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion
    .collection('usuario')
    .find({})
    .toArray(callback)
}

const crearUsuario = async (datosUsuarios,callback) => {
    const conexion = getDB();
    await conexion.
    collection('usuario').
    insertOne(datosUsuarios, callback)        
} 
    
const consultarOCrearUsuario = async (req, callback) => {
    
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/data'];
    console.log(user);
  
    // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
    const conexion = getDB();
    await conexion.collection('usuario').findOne({ email: user.email }, async (err, response) => {
      console.log('response consulta bd', response);
      if (response) {
        // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
        callback(err, response);
      } else {
        // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
        user.auth0ID = user._id;
        user.name = user.nombre;
        delete user._id;
        user.roll = '';
        user.estado = 'pendiente';
        await crearUsuario(user, (err, respuesta) => callback(err, user));
      }
    });
  };


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

export { queryAllUsuarios , crearUsuario, editarUsuario, eliminarUsuarios ,consultarUsuario, consultarOCrearUsuario}
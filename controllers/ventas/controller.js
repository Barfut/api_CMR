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
            conexion.
            collection('venta').
            insertOne(datosVentas, callback)
        } else {
            res.sendStatus(500);
        }
} 
    

export { queryAllVentas , crearVenta}
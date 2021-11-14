import Express from "express";
import { getDB } from '../../db/db.js';

const rutasVentas = Express.Router()

rutasVentas.route('/ventas').get((req, res) => {
    console.log('Get en la ruta');
    const conexion = getDB();
    conexion
    .collection("venta")
    .find({})
    .toArray ((err, result) => {
        if(err) {            
            res.sendStatus(400).send ('Error consultando ventas')
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

rutasVentas.route('/ventas/nueva').post((req, res) => {
    console.log(req.body);
    const datosVentas = req.body;
    console.log(Object.keys(datosVentas));

    try {
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
                insertOne(datosVentas, (err, result) => {
                    if(err) {
                        console.error(err);
                        res.sendStatus(500); 
                    } else {
                        console.log(result);
                        res.sendStatus(200);
                    }
                });
            } else {
                res.sendStatus(500);
            }
        } catch {
        res.sendStatus(500);
    }
    
});

rutasVentas.route('/ventas/editar').patch((req, res) => {
    const edicion= req.body;
    console.log(edicion)
    const filtroVenta = {_id: new ObjectId(edicion.id)}
    delete edicion.id
    const operacion = {
        $set: edicion,
    }
    const conexion = getDB();
    conexion
    .collection('venta')
    .findOneAndUpdate(
        filtroVenta, 
        operacion, 
        {upsert: true, returnOriginal:true}, 
        (err, result) => {
        if(err) {
            console.error('error al editar venta:', err);
            res.sendStatus(500); 
        } else {
            console.log('actualizada');
            res.sendStatus(200);
        }
    });
})

rutasVentas.route('/ventas/eliminar').delete((req, res) => {
    const filtroVenta = {_id: new ObjectId(req.body.id)}
    const conexion = getDB();
    conexion
    .collection('venta').deleteOne(filtroVenta, (err, result) => {
        if(err) {
            console.error('error al eliminar venta:', err);
            res.sendStatus(500);  
        } else {
            console.log('eliminado');
            res.sendStatus(200);
        }
    });
})

export default rutasVentas
import Express from "express";
import { crearVenta, queryAllVentas } from "../../controllers/ventas/controller.js";
import { getDB } from '../../db/db.js';

const rutasVentas = Express.Router()

const genercCallback = (res) => (err, result) => {
    if(err) {            
        res.sendStatus(400).send ('Error consultando ventas')
    } else {
        res.json(result);
    }
}


rutasVentas.route('/ventas').get((req, res) => {
    console.log('Get en la ruta');
    queryAllVentas(genercCallback(res));
});

rutasVentas.route('/ventas/nueva').post((req, res) => {
    crearVenta (req.body, genercCallback(res))
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
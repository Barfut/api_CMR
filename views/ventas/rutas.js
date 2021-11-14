import Express from "express";
import { crearVenta, editarVenta, eliminarVentas, queryAllVentas } from "../../controllers/ventas/controller.js";

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
    editarVenta (req.body, genercCallback(res))
})

rutasVentas.route('/ventas/eliminar').delete((req, res) => {
    eliminarVentas (req.body.id, genercCallback(res))
})

export default rutasVentas
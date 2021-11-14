import Express from "express";
import { crearVenta, consultarVenta, editarVenta, eliminarVentas, queryAllVentas } from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router()

const genercCallback = (res) => (err, result) => {
    if(err) {            
        res.sendStatus(400).send ('Error consultando ventas')
    } else {
        res.json(result);
    }
}


rutasVentas.route('/ventas').get((req, res) => {
    queryAllVentas(genercCallback(res));
});

rutasVentas.route('/ventas').post((req, res) => {
    crearVenta (req.body, genercCallback(res))
});

rutasVentas.route('/ventas/:id').patch((req, res) => {
    editarVenta (req.params.id, req.body, genercCallback(res))
})

rutasVentas.route('/ventas/:id').delete((req, res) => {
    eliminarVentas (req.params.id, genercCallback(res))
})


rutasVentas.route('/ventas/:id').get((req, res) => {
    consultarVenta(req.params.id, genercCallback(res));
});


export default rutasVentas
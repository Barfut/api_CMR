import Express from "express";
import { crearInventario, consultarInventario, editarInventario, eliminarInventario, queryAllInventario } from "../../controllers/inventario/controller.js";

const rutasInventario = Express.Router()

const genercCallback = (res) => (err, result) => {
    if(err) {            
        res.sendStatus(400).send ('Error consultando inventario')
    } else {
        res.json(result);
    }
}


rutasInventario.route('/inventario').get((req, res) => {
    queryAllInventario(genercCallback(res));
});

rutasInventario.route('/inventario').post((req, res) => {
    crearInventario (req.body, genercCallback(res))
});

rutasInventario.route('/inventario/:id').patch((req, res) => {
    editarInventario (req.params.id, req.body, genercCallback(res))
})

rutasInventario.route('/inventario/:id').delete((req, res) => {
    eliminarInventario (req.params.id, genercCallback(res))
})


rutasInventario.route('/inventario/:id').get((req, res) => {
    consultarInventario(req.params.id, genercCallback(res));
});


export default rutasInventario
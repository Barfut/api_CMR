import Express from "express";
import { crearUsuario, consultarUsuario, editarUsuario, eliminarUsuarios, queryAllUsuarios } from "../../controllers/usuarios/controller.js";

const rutasUsuarios = Express.Router()

const genercCallback = (res) => (err, result) => {
    if(err) {            
        res.status(500).json({ error: err })
    } else {
        res.json(result);
    }
}


rutasUsuarios.route('/usuarios').get((req, res) => {
    queryAllUsuarios(genercCallback(res));
});

rutasUsuarios.route('/usuarios').post((req, res) => {
    crearUsuario (req.body, genercCallback(res))
});

rutasUsuarios.route('/usuarios/self').get((req, res) => {
    console.log('alguien hizo get en la ruta /self');
    consultarOCrearUsuario(req, genercCallback(res));
    // consultarUsuario(, genercCallback(res));
  });

rutasUsuarios.route('/usuarios/:id').patch((req, res) => {
    editarUsuario (req.params.id, req.body, genercCallback(res))
})

rutasUsuarios.route('/usuarios/:id').delete((req, res) => {
    eliminarUsuarios (req.params.id, genercCallback(res))
})


rutasUsuarios.route('/usuarios/:id').get((req, res) => {
    consultarUsuario(req.params.id, genercCallback(res));
});


export default rutasUsuarios
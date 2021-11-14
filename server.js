import Express from "express";
import { MongoClient , ObjectId} from "mongodb";
import Cors from 'cors';
import { conectarServer, getDB } from './db/db.js';
import dotenv from 'dotenv';

dotenv.config({path: './.env'})


const app = Express()

app.use(Express.json())
app.use(Cors());

app.get('/ventas', (req, res) => {
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

app.post('/ventas/nueva', (req, res) => {
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

app.patch('/ventas/editar', (req, res) => {
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

app.delete('/ventas/eliminar', (req, res) => {
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



const main = () => {
    return app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  }

conectarServer(main);
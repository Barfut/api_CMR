import Express from "express";
import Cors from 'cors';
import { conectarServer, getDB } from './db/db.js';
import dotenv from 'dotenv';
import rutasVentas from "./views/ventas/rutas.js";

dotenv.config({path: './.env'})


const app = Express()

app.use(Express.json())
app.use(Cors());
app.use(rutasVentas)

const main = () => {
    return app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  }

conectarServer(main);
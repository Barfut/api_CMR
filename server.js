import Express from "express";
import Cors from 'cors';
import { conectarServer } from './db/db.js';
import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { auth } from 'express-oauth2-jwt-bearer';
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasInventario from "./views/inventario/rutas.js";

dotenv.config({path: './.env'})

const port = process.env.PORT || 5000

const app = Express()

app.use(Express.json())
app.use(Cors());


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://barfut-autenticacion.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-barfut',
issuer: 'https://barfut-autenticacion.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck)
app.use(rutasVentas)
app.use(rutasUsuarios)
app.use(rutasInventario)

const main = () => {
    return app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }

  
conectarServer(main);
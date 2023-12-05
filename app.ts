import express from 'express';
import bodyParser from 'body-parser';

import { db } from './db/conexion'; //Importando la configuración de la base de datos.

db.conectarDB(); //Aquí se ejecuta el método que realiza la conexión al DBMS.

export const app: express.Application = express();

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

import { router as rutasUsuario } from './routes/usuario'; //Importando las rutas del modelo usuario.
import { router as rutasProducto } from './routes/producto'; //Importando las rutas del modelo producto.

app.use("/api/usuario", rutasUsuario); //Asignando las rutas del modelo "Usuario" al servidor Express.
app.use("/api/producto", rutasProducto); //Asignando las rutas del modelo "Producto" al servidor Express.
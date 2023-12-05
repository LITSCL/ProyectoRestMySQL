"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const conexion_1 = require("./db/conexion"); //Importando la configuración de la base de datos.
conexion_1.db.conectarDB(); //Aquí se ejecuta el método que realiza la conexión al DBMS.
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.static("./public"));
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
const usuario_1 = require("./routes/usuario"); //Importando las rutas del modelo usuario.
const producto_1 = require("./routes/producto"); //Importando las rutas del modelo producto.
exports.app.use("/api/usuario", usuario_1.router); //Asignando las rutas del modelo "Usuario" al servidor Express.
exports.app.use("/api/producto", producto_1.router); //Asignando las rutas del modelo "Producto" al servidor Express.
//# sourceMappingURL=app.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
//2. Preparar la configuración de conexión.
var conexion = new sequelize_1.Sequelize("dbproyectorestmysql", "root", "root", {
    host: "localhost",
    dialect: "mariadb",
    port: 3306
});
//3. Agrupar y exportar la variable de configuración y la función de conexión dentro de un objeto.
exports.db = {
    conexion: conexion,
    conectarDB: function conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion.authenticate(); //El método "authenticate" realiza la conexión a la base de datos.
                console.log("Conexion a la base de datos realizada con exito");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
//# sourceMappingURL=conexion.js.map
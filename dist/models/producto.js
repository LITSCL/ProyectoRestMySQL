"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const conexion_1 = require("../db/conexion");
const sequelize_1 = require("sequelize"); //Importar "DataTypes" es necesario para asignar los tipos de datos a las columnas.
exports.Producto = conexion_1.db.conexion.define("Producto", {
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true //Cuando no hay un ID auto incremental como PK, se debe especificar cual columna es PK.
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.DOUBLE
    }
}, {
    tableName: "producto",
    timestamps: false //Esto evita que se creen las columnas "createdAt" y "updatedAt".
});
//# sourceMappingURL=producto.js.map
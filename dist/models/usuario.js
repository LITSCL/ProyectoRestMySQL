"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const conexion_1 = require("../db/conexion");
const sequelize_1 = require("sequelize"); //Importar "DataTypes" es necesario para asignar los tipos de datos a las columnas.
exports.Usuario = conexion_1.db.conexion.define("Usuario", {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    tableName: "usuario",
    timestamps: false //Esto evita que se creen las columnas createdAt y updatedAt.
});
//# sourceMappingURL=usuario.js.map
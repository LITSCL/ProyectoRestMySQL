import { db } from '../db/conexion';
import { DataTypes, ModelCtor } from 'sequelize'; //Importar "DataTypes" es necesario para asignar los tipos de datos a las columnas.
import { Model } from 'sequelize/types';

export var Producto: ModelCtor<Model<any, any>> = db.conexion.define("Producto", { //Modelo Producto (Este modelo ya esta conectado a la base de datos).
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true //Cuando no hay un ID auto incremental como PK, se debe especificar cual columna es PK.
    },
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DOUBLE
    }
}, {
    tableName: "producto", //Aquí se especifica a que tabla representa este modelo.
    timestamps: false //Esto evita que se creen las columnas "createdAt" y "updatedAt".
});
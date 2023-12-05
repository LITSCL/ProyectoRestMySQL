import { db } from '../db/conexion';
import { DataTypes, ModelCtor } from 'sequelize'; //Importar "DataTypes" es necesario para asignar los tipos de datos a las columnas.
import { Model } from 'sequelize/types';

export var Usuario: ModelCtor<Model<any, any>> = db.conexion.define("Usuario", { //Modelo Usuario (Este modelo ya esta conectado a la base de datos).
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: "usuario", //Aquí se especifica a que tabla representa este modelo.
    timestamps: false //Esto evita que se creen las columnas createdAt y updatedAt.
});
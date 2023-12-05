import { Sequelize } from 'sequelize';

//1. Crear la interface del objeto de conexión.
interface Database {
    conexion: Sequelize;
    conectarDB: () => Promise<void>;
}

//2. Preparar la configuración de conexión.
var conexion: Sequelize = new Sequelize("dbproyectorestmysql", "root", "root", {
    host: "localhost",
    dialect: "mariadb",
    port: 3306
});

//3. Agrupar y exportar la variable de configuración y la función de conexión dentro de un objeto.
export const db: Database = {
    conexion: conexion,
    conectarDB: async function conectarDB(): Promise<void> {
        try {
            await conexion.authenticate(); //El método "authenticate" realiza la conexión a la base de datos.
            console.log("Conexion a la base de datos realizada con exito");
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
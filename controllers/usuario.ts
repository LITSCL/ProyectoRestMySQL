import { Usuario } from '../models/usuario'; //Importando el modelo "Usuario".
import { db } from '../db/conexion';
import { Model } from 'sequelize/types';
import { Request, Response } from 'express';
import { ValidacionHelper } from '../helpers/ValidacionHelper';

var validacionHelper = new ValidacionHelper();

var sql: string = "";

var controlador: any = {};

controlador.getUsuarios = async function(request: Request, response: Response): Promise<any> {
    var usuarios: Model<any, any>[] = await Usuario.findAll();
    
    return response.status(200).send({
        usuarios
    });
}

controlador.getUsuario = async function(request: Request, response: Response): Promise<any> {
    var params: any = request.params;

    var id: string = params.id;

    var usuario: Model<any, any> | null = await Usuario.findByPk(id); //Esto es igual a un "SELECT * FROM usuario WHERE id = 2";

    //Consultando si el usuario existe.
    if (!usuario) return response.status(404).json({mensaje: "SERVIDOR: No existe el usuario con el id " + id});
    
    return response.status(200).send({
        usuario
    });
}

controlador.saveUsuario = async function(request: Request, response: Response): Promise<any> {
    var body: any = request.body; //Esto es un objeto json con los parámetros obtenidos {nombre: 'Daniel', email: "daniel@protonmail.com", estado: 1}.

    var validacionEmail = validacionHelper.validarCadena(body.email);

    if (validacionEmail) {
        try {
            var existeEmail = await Usuario.findOne({ //El método "findOne" permite buscar un registro basandose en un WHERE.
                where: {
                    email: body.email //Esto es igual a un "SELECT email FROM usuario WHERE email = ejemplo@ejemplo.ejemplo".
                }
            });

            if (existeEmail) return response.status(400).json({mensaje: "SERVIDOR: Ya existe un usuario con el email " + body.email});

            var usuario: Model<any, any> = Usuario.build(body); //Esto es lo mismo que "const usuario = new Usuario(body)"; 
            
            await usuario.save();
            return response.status(200).send({
                usuario
            });
        } catch (error) {
            return response.status(500).json({mensaje: "SERVIDOR: Error al registrar el usuario"});
        }
    }
    else {
        return response.status(400).send({mensaje: "SERVIDOR: Error de validación"});
    }
}

controlador.updateUsuario = async function(request: Request, response: Response): Promise<any> {
    var params: any = request.params;
    var body: any = request.body;

    var id: string = params.id

    try {
        var usuario: Model<any, any> | null = await Usuario.findByPk(id);

        if (!usuario) return response.status(404).json({mensaje: "SERVIDOR: No existe un usuario con el id " + id});

        await usuario.update(body);
        return response.status(200).send({ //Aquí se retorna el usuario ya modificado.
            usuario
        });
    } catch (error) {
        return response.status(500).json({mensaje: "SERVIDOR: Error al registrar el usuario"});
    }
}

controlador.deleteUsuario = async function(request: Request, response: Response): Promise<any> {
    var params: any = request.params;

    var id: string = params.id;

    var usuario: Model<any, any> | null = await Usuario.findByPk(id);

    if (!usuario) return response.status(404).json({mensaje: "SERVIDOR: No existe un usuario con el id " + id});

    //await usuario.update({estado: false}); //Esto es un borrado lógico, simplemente se actualiza una columna del registro (Se esta actualizando la columna "estado").
    
    await usuario.destroy(); //El método "destroy" borra el registro de la base de datos.
    return response.status(200).send({ //Aquí se retorna el usuario borrado.
        usuario
    });
}

export const UsuarioControlador = controlador;
import { Producto } from '../models/producto'; //Importando el modelo "Producto".
import { db } from '../db/conexion';
import { Model } from 'sequelize/types';
import { Request, Response } from 'express';
import { ValidacionHelper } from '../helpers/ValidacionHelper';

var validacionHelper = new ValidacionHelper();

var sql: string = "";

var controlador: any = {};

controlador.getProductos = async function(request: Request, response: Response): Promise<any> {
    var productos: Model<any, any>[] = await Producto.findAll();
    
    return response.status(200).send({
        productos
    });
}

controlador.getProducto = async function(request: Request, response: Response): Promise<any> {
    var params: any = request.params;

    var codigo: string = params.codigo;

    var producto: Model<any, any> | null = await Producto.findByPk(codigo); //Esto es igual a un "SELECT * FROM producto WHERE codigo = 2";

    //Consultando si el producto existe.
    if (!producto) return response.status(404).json({mensaje: "SERVIDOR: No existe el producto con el codigo " + codigo});
    
    return response.status(200).send({
        producto
    });
}

controlador.saveProducto = async function(request: Request, response: Response): Promise<any> {
    var body: any = request.body; //Esto es un objeto json con los parámetros obtenidos {codigo: 'GG-1234', nombre: "AMD Phenom II x4 955", precio: 132000}.

    var validacionCodigo = validacionHelper.validarCadena(body.codigo);

    if (validacionCodigo) {
        try {
            var producto: Model<any, any> = Producto.build(body); //Esto es lo mismo que "const producto = new Producto(body)"; 
            
            await producto.save();
            return response.status(200).send({
                producto
            });
        } catch (error) {
            return response.status(500).json({mensaje: "SERVIDOR: Error al registrar el producto"});
        }
    }
    else {
        return response.status(400).send({mensaje: "SERVIDOR: Error de validación"});
    }
}

controlador.updateProducto = async function(request: Request, response: Response): Promise<any> {
    var params: any = request.params;
    var body: any = request.body;
    
    var codigo: string = params.codigo;

    try {
        var producto: Model<any, any> | null = await Producto.findByPk(codigo);

        if (!producto) return response.status(404).json({mensaje: "SERVIDOR: No existe un producto con el codigo " + codigo});

        await producto.update(body);
        return response.status(200).send({ //Aquí se retorna el producto ya modificado.
            producto
        });
    } catch (error) {
        return response.status(500).json({mensaje: "SERVIDOR: Error al registrar el producto"});
    }
}

controlador.deleteProducto = async function(request: Request, response: Response): Promise<any> {
    var params: any = request.params;

    var codigo: string = params.codigo;

    var producto: Model<any, any> | null = await Producto.findByPk(codigo);

    if (!producto) return response.status(404).json({mensaje: "SERVIDOR: No existe un producto con el codigo " + codigo});

    //await producto.update({estado: false}); //Esto es un borrado lógico, simplemente se actualiza una columna del registro (Se está actualizando la columna "estado").
    
    await producto.destroy(); //El método "destroy" borra el registro de la base de datos.
    return response.status(200).send({ //Aquí se retorna el producto borrado.
        producto
    }); 
}

export const ProductoControlador = controlador;
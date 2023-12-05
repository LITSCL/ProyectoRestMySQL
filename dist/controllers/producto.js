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
exports.ProductoControlador = void 0;
const producto_1 = require("../models/producto"); //Importando el modelo "Producto".
const ValidacionHelper_1 = require("../helpers/ValidacionHelper");
var validacionHelper = new ValidacionHelper_1.ValidacionHelper();
var sql = "";
var controlador = {};
controlador.getProductos = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var productos = yield producto_1.Producto.findAll();
        return response.status(200).send({
            productos
        });
    });
};
controlador.getProducto = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = request.params;
        var codigo = params.codigo;
        var producto = yield producto_1.Producto.findByPk(codigo); //Esto es igual a un "SELECT * FROM producto WHERE codigo = 2";
        //Consultando si el producto existe.
        if (!producto)
            return response.status(404).json({ mensaje: "SERVIDOR: No existe el producto con el codigo " + codigo });
        return response.status(200).send({
            producto
        });
    });
};
controlador.saveProducto = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var body = request.body; //Esto es un objeto json con los parámetros obtenidos {codigo: 'GG-1234', nombre: "AMD Phenom II x4 955", precio: 132000}.
        var validacionCodigo = validacionHelper.validarCadena(body.codigo);
        if (validacionCodigo) {
            try {
                var producto = producto_1.Producto.build(body); //Esto es lo mismo que "const producto = new Producto(body)"; 
                yield producto.save();
                return response.status(200).send({
                    producto
                });
            }
            catch (error) {
                return response.status(500).json({ mensaje: "SERVIDOR: Error al registrar el producto" });
            }
        }
        else {
            return response.status(400).send({ mensaje: "SERVIDOR: Error de validación" });
        }
    });
};
controlador.updateProducto = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = request.params;
        var body = request.body;
        var codigo = params.codigo;
        try {
            var producto = yield producto_1.Producto.findByPk(codigo);
            if (!producto)
                return response.status(404).json({ mensaje: "SERVIDOR: No existe un producto con el codigo " + codigo });
            yield producto.update(body);
            return response.status(200).send({
                producto
            });
        }
        catch (error) {
            return response.status(500).json({ mensaje: "SERVIDOR: Error al registrar el producto" });
        }
    });
};
controlador.deleteProducto = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = request.params;
        var codigo = params.codigo;
        var producto = yield producto_1.Producto.findByPk(codigo);
        if (!producto)
            return response.status(404).json({ mensaje: "SERVIDOR: No existe un producto con el codigo " + codigo });
        //await producto.update({estado: false}); //Esto es un borrado lógico, simplemente se actualiza una columna del registro (Se está actualizando la columna "estado").
        yield producto.destroy(); //El método "destroy" borra el registro de la base de datos.
        return response.status(200).send({
            producto
        });
    });
};
exports.ProductoControlador = controlador;
//# sourceMappingURL=producto.js.map
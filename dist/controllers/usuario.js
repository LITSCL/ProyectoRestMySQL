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
exports.UsuarioControlador = void 0;
const usuario_1 = require("../models/usuario"); //Importando el modelo "Usuario".
const ValidacionHelper_1 = require("../helpers/ValidacionHelper");
var validacionHelper = new ValidacionHelper_1.ValidacionHelper();
var sql = "";
var controlador = {};
controlador.getUsuarios = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var usuarios = yield usuario_1.Usuario.findAll();
        return response.status(200).send({
            usuarios
        });
    });
};
controlador.getUsuario = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = request.params;
        var id = params.id;
        var usuario = yield usuario_1.Usuario.findByPk(id); //Esto es igual a un "SELECT * FROM usuario WHERE id = 2";
        //Consultando si el usuario existe.
        if (!usuario)
            return response.status(404).json({ mensaje: "SERVIDOR: No existe el usuario con el id " + id });
        return response.status(200).send({
            usuario
        });
    });
};
controlador.saveUsuario = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var body = request.body; //Esto es un objeto json con los parámetros obtenidos {nombre: 'Daniel', email: "daniel@protonmail.com", estado: 1}.
        var validacionEmail = validacionHelper.validarCadena(body.email);
        if (validacionEmail) {
            try {
                var existeEmail = yield usuario_1.Usuario.findOne({
                    where: {
                        email: body.email //Esto es igual a un "SELECT email FROM usuario WHERE email = ejemplo@ejemplo.ejemplo".
                    }
                });
                if (existeEmail)
                    return response.status(400).json({ mensaje: "SERVIDOR: Ya existe un usuario con el email " + body.email });
                var usuario = usuario_1.Usuario.build(body); //Esto es lo mismo que "const usuario = new Usuario(body)"; 
                yield usuario.save();
                return response.status(200).send({
                    usuario
                });
            }
            catch (error) {
                return response.status(500).json({ mensaje: "SERVIDOR: Error al registrar el usuario" });
            }
        }
        else {
            return response.status(400).send({ mensaje: "SERVIDOR: Error de validación" });
        }
    });
};
controlador.updateUsuario = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = request.params;
        var body = request.body;
        var id = params.id;
        try {
            var usuario = yield usuario_1.Usuario.findByPk(id);
            if (!usuario)
                return response.status(404).json({ mensaje: "SERVIDOR: No existe un usuario con el id " + id });
            yield usuario.update(body);
            return response.status(200).send({
                usuario
            });
        }
        catch (error) {
            return response.status(500).json({ mensaje: "SERVIDOR: Error al registrar el usuario" });
        }
    });
};
controlador.deleteUsuario = function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var params = request.params;
        var id = params.id;
        var usuario = yield usuario_1.Usuario.findByPk(id);
        if (!usuario)
            return response.status(404).json({ mensaje: "SERVIDOR: No existe un usuario con el id " + id });
        //await usuario.update({estado: false}); //Esto es un borrado lógico, simplemente se actualiza una columna del registro (Se esta actualizando la columna "estado").
        yield usuario.destroy(); //El método "destroy" borra el registro de la base de datos.
        return response.status(200).send({
            usuario
        });
    });
};
exports.UsuarioControlador = controlador;
//# sourceMappingURL=usuario.js.map
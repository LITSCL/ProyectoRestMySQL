"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
exports.router = (0, express_1.Router)();
exports.router.get("/get-usuarios", usuario_1.UsuarioControlador.getUsuarios);
exports.router.get("/get-usuario/:id", usuario_1.UsuarioControlador.getUsuario);
exports.router.post("/save-usuario", usuario_1.UsuarioControlador.saveUsuario);
exports.router.put("/update-usuario/:id", usuario_1.UsuarioControlador.updateUsuario);
exports.router.delete("/delete-usuario/:id", usuario_1.UsuarioControlador.deleteUsuario);
//# sourceMappingURL=usuario.js.map
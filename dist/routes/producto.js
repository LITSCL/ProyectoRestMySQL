"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
exports.router = (0, express_1.Router)();
exports.router.get("/get-productos", producto_1.ProductoControlador.getProductos);
exports.router.get("/get-producto/:codigo", producto_1.ProductoControlador.getProducto);
exports.router.post("/save-producto", producto_1.ProductoControlador.saveProducto);
exports.router.put("/update-producto/:codigo", producto_1.ProductoControlador.updateProducto);
exports.router.delete("/delete-producto/:codigo", producto_1.ProductoControlador.deleteProducto);
//# sourceMappingURL=producto.js.map
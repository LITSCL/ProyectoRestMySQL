import { Router } from 'express';
import { ProductoControlador } from '../controllers/producto';

export var router: Router = Router();

router.get("/get-productos", ProductoControlador.getProductos);
router.get("/get-producto/:codigo", ProductoControlador.getProducto);
router.post("/save-producto", ProductoControlador.saveProducto);
router.put("/update-producto/:codigo", ProductoControlador.updateProducto);
router.delete("/delete-producto/:codigo", ProductoControlador.deleteProducto);
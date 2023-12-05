import { Router } from 'express';
import { UsuarioControlador } from '../controllers/usuario';

export var router: Router = Router();

router.get("/get-usuarios", UsuarioControlador.getUsuarios);
router.get("/get-usuario/:id", UsuarioControlador.getUsuario);
router.post("/save-usuario", UsuarioControlador.saveUsuario);
router.put("/update-usuario/:id", UsuarioControlador.updateUsuario);
router.delete("/delete-usuario/:id", UsuarioControlador.deleteUsuario);
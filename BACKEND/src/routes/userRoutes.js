import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', usuarioController.index);
router.get('/:id', usuarioController.show);
router.post('/', usuarioController.store);
router.put('/:id', loginRequired, usuarioController.update);
// router.delete('/:id', loginRequired, usuarioController.delete);

export default router;

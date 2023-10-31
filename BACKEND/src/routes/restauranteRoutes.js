import { Router } from 'express';
import restauranteController from '../controllers/RestauranteController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', restauranteController.index);
router.get('/:id', restauranteController.show);
router.post('/', restauranteController.store);
router.put('/:id', restauranteController.update);
router.delete('/:id', loginRequired, restauranteController.delete);

export default router;

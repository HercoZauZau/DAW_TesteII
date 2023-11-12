import { Router } from 'express';
import menuController from '../controllers/MenuController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', menuController.index);
router.get('/:user_id', menuController.indexUSer);
// router.get('/:id', menuController.show);
router.post('/', menuController.store);
router.put('/:id', loginRequired, menuController.update);
router.delete('/:id', loginRequired, menuController.delete);

export default router;

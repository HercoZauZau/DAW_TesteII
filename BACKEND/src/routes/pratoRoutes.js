import { Router } from 'express';
import pratoController from '../controllers/PratoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/:rest_id', pratoController.index);
// router.get('/:id', pratoController.show);
router.post('/', loginRequired, pratoController.store);
router.put('/:id', loginRequired, pratoController.update);
router.delete('/:id', loginRequired, pratoController.delete);

export default router;

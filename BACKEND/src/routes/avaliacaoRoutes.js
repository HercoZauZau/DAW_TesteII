import { Router } from 'express';
import avaliacaoController from '../controllers/AvaliacaoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', avaliacaoController.index);
router.get('/:id', avaliacaoController.show);
router.post('/', avaliacaoController.store);
router.put('/:id', avaliacaoController.update);
router.delete('/:id', loginRequired, avaliacaoController.delete);

export default router;

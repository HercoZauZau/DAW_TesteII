import { Router } from 'express';
import avaliacaoController from '../controllers/AvaliacaoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', avaliacaoController.index);
router.get('/:id', avaliacaoController.show);
router.post('/', loginRequired, avaliacaoController.store);
router.put('/:id', loginRequired, avaliacaoController.update);
// router.delete('/:id', loginRequired, avaliacaoController.delete);

export default router;

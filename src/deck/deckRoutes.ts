import * as express from 'express';
const router =  express.Router();
import deckController from './deckController';


/*
 * GET
 */
router.get('/', deckController.list);

/*
 * GET
 */
router.get('/:id', deckController.show);

/*
 * GET
 */
router.get('/:id/draw', deckController.draw);

/*
 * POST
 */
router.post('/', deckController.create);

/*
 * PUT
 */
//router.put('/:id', deckController.update);

/*
 * DELETE
 */
router.delete('/:id', deckController.remove);

export = router;

import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
const router = Router();
import {
  getChantiers,
  getChantier,
  createChantier,
  updateChantier,
  deleteChantier
} from '../controllers/chantiers';
import validateParams from '../helpers/validateParams';

router.get('/', getChantiers);

router.get('/:chantierId', getChantier);

router.post(
  '/',
  body('date').isDate(),
  body('name').notEmpty().isString(),
  validateParams,
  createChantier
);

router.put(
  '/:chantierId',
  body('date').isDate(),
  body('name').notEmpty().isString(),
  validateParams,
  updateChantier
);

router.delete('/:chantierId', deleteChantier);

export default router;

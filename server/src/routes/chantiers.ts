import { Router } from 'express';
import { body, query } from 'express-validator';
import { Order } from '../config/constants';
const router = Router();
import {
  getChantiers,
  getChantier,
  createChantier,
  updateChantier,
  deleteChantier
} from '../controllers/chantiers';
import validateParams from '../helpers/validateParams';
import Chantier from '../models/Chantier';

router.get(
  '/',
  query('sortOrder').isIn(Object.values(Order)),
  query('sortBy').isIn(Object.keys(Chantier.schema.paths)),
  query('page').isInt({ min: 0 }),
  query('limit').isInt({ min: 0 }),
  validateParams,
  getChantiers
);

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

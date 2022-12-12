import { Router } from 'express';
const router = Router();
import {
  getChantiers,
  getChantier,
  createChantier,
  updateChantier,
  deleteChantier
} from '../controllers/chantiers';

router.get('/', getChantiers);

router.get('/:chantierId', getChantier);

router.post('/', createChantier);

router.put('/:chantierId', updateChantier);

router.delete('/:chantierId', deleteChantier);

export default router;

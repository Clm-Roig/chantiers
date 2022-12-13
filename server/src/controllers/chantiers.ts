import { Request, Response } from 'express';
import { Order } from '../config/constants';
import Chantier from '../models/Chantier';

const MAX_LIMIT = 100;

export const getChantiers = async (req: Request, res: Response) => {
  const sortBy = Object.keys(Chantier.schema.paths).includes(req.query.sortBy as string)
    ? req.query.sortBy
    : 'date';

  const sortString = `${req.query.sortOrder === Order.DESC ? '-' : ''}${sortBy}`;
  const page = Number(req.query.page) || 0;
  const limit = Math.min(MAX_LIMIT, Number(req.query.limit)) || 20;

  Chantier.find({})
    .limit(limit)
    .sort(sortString)
    .skip(page * limit)
    .then(async (result) => {
      const total = await Chantier.count();
      res.set('X-Total-Count', total + '');
      res.status(200).json({ chantiers: result });
    })
    .catch((error) => res.status(500).json({ msg: error }));
};

export const getChantier = (req: Request, res: Response) => {
  Chantier.findOne({ _id: req.params.chantierId })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Chantier not found' }));
};

export const createChantier = (req: Request, res: Response) => {
  Chantier.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

export const updateChantier = (req: Request, res: Response) => {
  Chantier.findOneAndUpdate({ _id: req.params.chantierId }, req.body, {
    new: true,
    runValidators: true
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: 'Chantier not found' }));
};

export const deleteChantier = (req: Request, res: Response) => {
  Chantier.findOneAndDelete({ _id: req.params.chantierId })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: 'Chantier not found' }));
};

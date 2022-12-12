import { Request, Response } from 'express';
import Chantier from '../models/Chantier';

export const getChantiers = (req: Request, res: Response) => {
  Chantier.find({})
    .then((result) => res.status(200).json({ result }))
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

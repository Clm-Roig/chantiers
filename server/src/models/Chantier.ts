import { Schema, model } from 'mongoose';

const ChantierSchema = new Schema({
  name: String,
  description: String,
  date: { type: Date, default: Date.now },
  type: String
});

const Chantier = model('Chantier', ChantierSchema);

export default Chantier;

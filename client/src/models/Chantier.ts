import ChantierType from './ChantierType';

interface Chantier {
  _id: string;
  name: string;
  description?: string;
  date: Date;
  type: ChantierType;
}

export default Chantier;

import ChantierType from './ChantierType';

interface Chantier {
  name: string;
  description?: string;
  date: Date;
  type: ChantierType;
}

export default Chantier;

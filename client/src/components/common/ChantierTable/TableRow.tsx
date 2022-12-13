import { MouseEvent } from 'react';
import { TableCell, TableRow as MuiTableRow } from '@mui/material';
import Chantier from '../../../models/Chantier';

interface Props {
  chantier: Chantier;
  handleRowClick: (event: MouseEvent<unknown>, clickedChantier: Chantier) => void;
  isSelected: (chantierId: Chantier['_id']) => boolean;
}

function TableRow({ chantier, handleRowClick, isSelected }: Props) {
  return (
    <MuiTableRow
      hover
      sx={{
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      onClick={(event) => handleRowClick(event, chantier)}
      role="checkbox"
      aria-checked={isSelected(chantier._id)}
      tabIndex={-1}
      selected={isSelected(chantier._id)}>
      <TableCell>{chantier.name}</TableCell>
      <TableCell>{chantier.description}</TableCell>
      <TableCell>{new Date(chantier.date).toLocaleDateString()}</TableCell>
      <TableCell>{chantier.type}</TableCell>
    </MuiTableRow>
  );
}

export default TableRow;

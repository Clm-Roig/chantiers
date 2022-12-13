import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function TableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}>
      <Typography sx={{ flex: '1 1 100%' }} variant="h2" id="tableTitle">
        Tous mes chantiers
      </Typography>
      {numSelected > 0 && (
        <Typography sx={{ flex: '1 1 100%' }} variant="subtitle1">
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default TableToolbar;

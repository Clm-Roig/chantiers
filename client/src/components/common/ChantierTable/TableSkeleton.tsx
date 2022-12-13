import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

function TableSkeleton() {
  return (
    <Box>
      <Skeleton width="100%" height="50px" />
      <Divider />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
      <Box display="flex" justifyContent="space-between">
        <Box flex={1} />
        <Skeleton sx={{ flex: 1 }} height="50px" />
      </Box>
    </Box>
  );
}

export default TableSkeleton;

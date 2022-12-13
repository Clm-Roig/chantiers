import { IconButton, Alert, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

interface Props {
  isSuccess: boolean;
  isError: boolean;
  successMessage?: string;
  errorMessage?: string;
}

function CreateChantierForm({ isSuccess, isError, successMessage, errorMessage }: Props) {
  const [displayAlert, setDisplayAlert] = useState(true);

  // Display alert if something changes
  useEffect(() => {
    setDisplayAlert(true);
  }, [isSuccess, isError, successMessage, errorMessage]);

  return (
    <Collapse in={(isSuccess || isError) && displayAlert}>
      <Alert
        severity={isSuccess ? 'success' : 'error'}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setDisplayAlert(false);
            }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        {isSuccess && successMessage}
        {isError && errorMessage}
      </Alert>
    </Collapse>
  );
}

export default CreateChantierForm;

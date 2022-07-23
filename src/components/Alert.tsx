import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ alertState, setAlertState }) {

  const handleClick = () => {
    setAlertState({ ...alertState, open: true })
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState({ ...alertState, open: false })
  };

  return (
    <Snackbar open={alertState.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertState.severity} sx={{ width: '100%' }}>
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}

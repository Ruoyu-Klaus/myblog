import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alert: {
    position: 'sticky',
    top: 120,
  },
}));

function TransitionLeft(props) {
  return <Slide {...props} direction='left' />;
}
function Alerts({ message, type, open, handleClose }) {
  // const types = ['error', 'success', 'warning', 'info'];
  const classes = useStyles();
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert variant='filled' className={classes.alert} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Alerts;

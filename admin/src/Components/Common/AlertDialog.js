import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialog({ title, open, handleClose, handleDelete }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>警告:确定要删除</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>{title} ？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            取消
          </Button>
          <Button onClick={handleDelete} color='primary'>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

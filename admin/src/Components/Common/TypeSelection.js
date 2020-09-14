import React, { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 'max-content',
  },
}));

function TypeSelection() {
  const classes = useStyles();
  const [type, setType] = useState('1');
  const [open, setOpen] = useState(false);

  const handleChange = event => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId='demo-controlled-open-select-label'
        id='demo-controlled-open-select'
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={type}
        onChange={handleChange}
      >
        <MenuItem value='1'>博客</MenuItem>
        <MenuItem value='2'>生活</MenuItem>
      </Select>
    </FormControl>
  );
}

export default TypeSelection;

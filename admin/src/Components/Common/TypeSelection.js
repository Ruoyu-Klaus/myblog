import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 'max-content',
  },
}));

function TypeSelection({ option, handleChange, types, placehoder }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId='controlled-open-select-label'
        id='controlled-open-select'
        open={open}
        displayEmpty
        onClose={handleClose}
        onOpen={handleOpen}
        value={option}
        onChange={handleChange}
      >
        <MenuItem value='' disabled>
          {placehoder}
        </MenuItem>
        {types &&
          types.map(type => (
            <MenuItem key={type.id} value={type.id}>
              {type.typeName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

TypeSelection.prototype = {
  types: PropTypes.array.isRequired,
  placehoder: PropTypes.string,
};

export default TypeSelection;

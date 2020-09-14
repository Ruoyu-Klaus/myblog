import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: 745,
    '& .MuiInputBase-root': {
      fontSize: 16,
    },
  },
}));

function TextArea() {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <div className='markdown-content'>
      <TextField
        className={classes.root}
        id='outlined-multiline-static'
        label='Content'
        multiline
        value={value}
        onChange={handleChange}
        rows={35}
        variant='outlined'
      />
    </div>
  );
}

export default TextArea;

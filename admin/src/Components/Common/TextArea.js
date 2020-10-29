import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100%',
    '& .MuiInputBase-root': {
      fontSize: 16,
    },
  },
}));

function TextArea({ rows, handleChange, value }) {
  const classes = useStyles();

  return (
    <div className='markdown-content'>
      <TextField
        className={classes.root}
        id='outlined-multiline-static'
        label='Content'
        multiline
        value={value}
        onChange={handleChange}
        rows={rows}
        variant='outlined'
      />
    </div>
  );
}
TextArea.propTypes = {
  rows: PropTypes.number.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default TextArea;

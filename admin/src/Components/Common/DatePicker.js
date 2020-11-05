import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/dayjs';

function DatePicker({ selectedDate, handleChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        label='DateTimePicker'
        inputVariant='outlined'
        value={selectedDate}
        onChange={handleChange}
      />
    </MuiPickersUtilsProvider>
  );
}
DatePicker.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DatePicker;

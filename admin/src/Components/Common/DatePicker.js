import React, { useState } from 'react';

import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'dayjs';
import DateFnsUtils from '@date-io/dayjs';

function DatePicker() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        label='DateTimePicker'
        inputVariant='outlined'
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;

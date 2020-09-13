import React, { useState } from 'react';
import marked from 'marked';
import '../static/css/AddArticle.css';

import { Grid } from '@material-ui/core';
import DatePicker from './Common/DatePicker';

function AddArticle() {
  return (
    <Grid container justify='space-around'>
      <DatePicker />
    </Grid>
  );
}

export default AddArticle;

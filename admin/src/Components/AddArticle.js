import React, { useState } from 'react';

import marked from 'marked';
import '../static/css/AddArticle.css';

import { Grid, TextField } from '@material-ui/core';
import TypeSelection from './Common/TypeSelection';
import DatePicker from './Common/DatePicker';
import TextArea from './Common/TextArea';
import HtmlMarkdown from './Common/HtmlMarkdown';

function AddArticle() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Grid container direction='column' spacing={2}>
          <Grid item container xs={12}>
            <Grid item xs={8} container justify='center' alignItems='flex-end'>
              <TextField id='standard-basic' label='Title' fullWidth style={{ margin: 8 }} />
            </Grid>
            <Grid item xs={4} container alignItems='flex-end'>
              <TypeSelection />
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={6}>
              <HtmlMarkdown />
            </Grid>
            <Grid item xs={6}>
              <TextArea />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <DatePicker />
      </Grid>
    </Grid>
  );
}

export default AddArticle;

import React, { useState } from 'react';

import marked from 'marked';
import '../static/css/AddArticle.css';

import { Grid, TextField, Button } from '@material-ui/core';
import TypeSelection from './Common/TypeSelection';
import DatePicker from './Common/DatePicker';
import TextArea from './Common/TextArea';
import HtmlMarkdown from './Common/HtmlMarkdown';

function AddArticle() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={9}>
        <Grid container direction='column' spacing={2}>
          <Grid item container xs={12} style={{ minHeight: 90 }}>
            <Grid item xs={8} container justify='center' alignItems='flex-end'>
              <TextField id='standard-basic' label='Title' fullWidth style={{ margin: 8 }} />
            </Grid>
            <Grid item xs={4} container alignItems='flex-end'>
              <TypeSelection />
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={6}>
              <HtmlMarkdown class_name='show-html' />
            </Grid>
            <Grid item xs={6}>
              <TextArea rows={36} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4} md={3}>
        <Grid container direction='column' spacing={2}>
          <Grid item container xs={12} style={{ minHeight: 90 }} alignItems='flex-end'>
            <Grid item xs={10}>
              <Button variant='contained' color='secondary'>
                暂存文章
              </Button>{' '}
              <Button variant='contained' color='primary'>
                发布文章
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction='column' xs={12} spacing={1}>
            <Grid item xs={12}>
              <TextArea rows={12} />
            </Grid>
            <Grid item xs={12}>
              <HtmlMarkdown class_name='introduce-html' />
            </Grid>
            <Grid item xs={12}>
              <div className='date-select'>
                <DatePicker />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddArticle;

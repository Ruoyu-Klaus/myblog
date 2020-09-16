import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  ListSubheader,
  Link,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { API } from '../config/default.json';
import * as dayjs from 'dayjs';
import Axios from '../utils/axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  subheader: {
    padding: 16,
  },
  title: {
    // marginBottom: '10px',
  },
  secondaryAction: {
    '& :not(:last-child)': {
      marginRight: 4,
    },
  },
}));

function ArticleList() {
  const classes = useStyles();
  const [list, setList] = useState([]);
  return (
    <List
      className={classes.root}
      subheader={
        <Grid container justify='space-between' alignItems='flex-end' className={classes.subheader}>
          <Grid item xs={4}>
            <Typography
              className={classes.header}
              component='h2'
              variant='body2'
              color='textPrimary'
            >
              标题
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              className={classes.header}
              component='h2'
              variant='body2'
              color='textPrimary'
            >
              标题
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              className={classes.header}
              component='h2'
              variant='body2'
              color='textPrimary'
            >
              标题
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              className={classes.header}
              component='h2'
              variant='body2'
              color='textPrimary'
            >
              标题
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        // <ListItem divider>
        //   <ListItemText
        //     primary={
        //       <Typography
        //         className={classes.header}
        //         component='h2'
        //         variant='body2'
        //         color='textPrimary'
        //       >
        //         标题
        //       </Typography>
        //     }
        //   />
        //   <ListItemText
        //     primary={
        //       <Typography
        //         className={classes.header}
        //         component='h2'
        //         variant='body2'
        //         color='textPrimary'
        //       >
        //         种类
        //       </Typography>
        //     }
        //   />
        //   <ListItemText
        //     primary={
        //       <Typography
        //         className={classes.header}
        //         component='h2'
        //         variant='body2'
        //         color='textPrimary'
        //       >
        //         上次更新时间
        //       </Typography>
        //     }
        //   />
        //   <ListItemText
        //     primary={
        //       <Typography
        //         className={classes.header}
        //         component='h2'
        //         variant='body2'
        //         color='textPrimary'
        //       >
        //         浏览量
        //       </Typography>
        //     }
        //   />
        // </ListItem>
      }
    >
      <ListItem alignItems='center' divider button style={{ cursor: 'default' }}>
        <Grid container justify='space-between'>
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography
                  className={classes.title}
                  component='h2'
                  variant='h6'
                  color='textPrimary'
                >
                  {/* <Link href={titleLink} target='_blank' color='inherit' underline='none'>
                {title}
              </Link> */}
                  title
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  className={classes.title}
                  component='h2'
                  variant='h6'
                  color='textPrimary'
                >
                  type
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  className={classes.title}
                  component='h2'
                  variant='h6'
                  color='textPrimary'
                >
                  time
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  className={classes.title}
                  component='h2'
                  variant='h6'
                  color='textPrimary'
                >
                  浏览数量
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton edge='end' aria-label='delete'>
              <EditIcon />
            </IconButton>
            <IconButton edge='end' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* <ListItemSecondaryAction className={classes.secondaryAction}>
          <IconButton edge='end' aria-label='delete'>
            <EditIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>
    </List>
  );
}
export default ArticleList;

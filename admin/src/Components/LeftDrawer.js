import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CommentIcon from '@material-ui/icons/Comment';

import { useHistory } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function LeftDrawer({ open, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const handleClick = e => {
    e.preventDefault();
    const pathTo = e.currentTarget.dataset.value || '/';
    if (pathTo === 'addArticle') {
      history.push('/index/addarticle');
    } else if (pathTo === 'articleList') {
      history.push('/index/list');
    }
  };

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={handleClick} data-value='Dashbord'>
          <ListItemIcon>
            <DonutSmallIcon />
          </ListItemIcon>
          <ListItemText primary='Dashbord' />
        </ListItem>
        <ListItem button onClick={handleClick} data-value='addArticle'>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary='New Article' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset>Manage Article</ListSubheader>
        <ListItem button onClick={handleClick} data-value='articleList'>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Artical List' />
        </ListItem>
        <ListItem button onClick={handleClick} data-value='comments'>
          <ListItemIcon>
            <CommentIcon />
          </ListItemIcon>
          <ListItemText primary='Comments' />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default LeftDrawer;

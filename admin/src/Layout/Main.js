import React from 'react';
import { Route } from 'react-router-dom';
import Copyright from '../Components/Common/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Breadcrumbs, Link, Container, Box } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddArticle from '../Components/AddArticle';
import ArticleList from '../Components/ArticleList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  breadcrumbs: {
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(2),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0, 1),
  },
}));

function Main() {
  const classes = useStyles();

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <Paper
      elevation={0}
      square
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <main className={classes.root}>
        <div className={classes.toolbar} />
        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={<NavigateNextIcon fontSize='small' />}
          aria-label='breadcrumb'
        >
          <Link color='inherit' href='/' onClick={handleClick}>
            Material-UI
          </Link>
          <Link color='inherit' href='/getting-started/installation/' onClick={handleClick}>
            Core
          </Link>
          <Typography color='textPrimary'>Breadcrumb</Typography>
        </Breadcrumbs>
        <div className={classes.content}>
          <Route exact path='/index/addarticle' component={AddArticle} />
          <Route exact path='/index/addarticle/:id' component={AddArticle} />
          <Route exact path='/index/list' component={ArticleList} />
        </div>
      </main>
      <Container component='footer' style={{ marginTop: 'auto' }}>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Paper>
  );
}

export default Main;

import React from 'react';
import { Route } from 'react-router-dom';
import Copyright from '../Components/Common/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Breadcrumbs, Link, Container, Box } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddArticle from '../Components/AddArticle';

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
          <Route exact path='/index' component={AddArticle} />

          {/* <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
            viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph> */}
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

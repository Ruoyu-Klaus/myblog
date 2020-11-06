import React from 'react';
import { Route, Switch, useLocation, Link as RouteLink } from 'react-router-dom';
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

  let loc = useLocation();
  let pathnames = loc.pathname.split('/').filter(w => w);

  let routes = [
    { path: 'index', name: '首页' },
    { path: 'addarticle', name: '新增文章' },
    { path: 'list', name: '文章列表' },
    { name: '修改文章' },
  ];

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
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const breadcrumbRoute = routes.filter(
              ({ path, name }) => path === value || !isNaN(Number(value))
            );
            return last ? (
              <Typography color='textPrimary' key={to}>
                {breadcrumbRoute.length === 1 ? breadcrumbRoute[0].name : value}
              </Typography>
            ) : (
              <Link color='inherit' component={RouteLink} to={to} key={to}>
                {breadcrumbRoute.length === 1 ? breadcrumbRoute[0].name : value}
              </Link>
            );
          })}
        </Breadcrumbs>
        <div className={classes.content}>
          <Switch>
            <Route exact path='/index' />
            <Route exact path='/index/addarticle' component={AddArticle} />
            <Route exact path='/index/addarticle/:id' component={AddArticle} />
            <Route exact path='/index/list' component={ArticleList} />
          </Switch>
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

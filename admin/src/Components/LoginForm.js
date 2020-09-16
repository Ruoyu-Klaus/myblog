import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Copyright from './Common/Copyright';
import Alert from './Common/Alerts';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { API } from '../config/default.json';
import Axios from '../utils/axios';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const history = useHistory();
  const [uname, setUname] = useState('');
  const [upassword, setUpassword] = useState('');
  const [openAlert, setOpenAlert] = useState({ open: false, message: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (!uname) {
      setOpenAlert(state => ({ ...state, open: true, message: '请输入用户名' }));
      return false;
    } else if (!upassword) {
      setOpenAlert(state => ({ ...state, open: true, message: '请输入密码' }));
      return false;
    }
    let dataProps = {
      userName: uname,
      password: upassword,
    };
    let reqUrl = API.servicePath.getCheckLogin;
    const fetchUser = async function () {
      let res = await Axios({
        method: 'post',
        url: reqUrl,
        data: dataProps,
        withCredentials: true,
      });
      if (res.data === '登录成功') {
        localStorage.setItem('openId', res.data.openId);
        history.push('/index');
      } else {
        setOpenAlert(state => ({ ...state, open: true, message: '用户名密码错误' }));
      }
    };
    fetchUser();
  };
  const handleClose = () => {
    setOpenAlert(state => ({ ...state, open: false }));
  };

  return (
    <div className={classes.paper}>
      <Alert
        message={openAlert.message}
        type='error'
        open={openAlert.open}
        handleClose={handleClose}
      />

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          onChange={e => setUname(e.target.value)}
          autoComplete='uname'
          name='userName'
          variant='outlined'
          required
          fullWidth
          id='userName'
          label='User Name'
          autoFocus
        />
        <TextField
          onChange={e => setUpassword(e.target.value)}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <Button
          onClick={handleSubmit}
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='#' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </div>
  );
}

export default LoginForm;

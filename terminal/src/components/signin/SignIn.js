import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const auth = (setToken, login, password) => {
    fetch('http://192.168.1.5:8080/auth',
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ "login": login, "password": password })
      })
      .then(response => response.json())
      .then(data => {
        setToken(data.token);
        console.log(data);
      })
      .catch(e => console.log(e));
}

export default function SignIn({setToken}) {
  const classes = useStyles();
  
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangelogin = (event) => {
    setLogin(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
        <Typography component="h1" variant="h5"> Sign in </Typography>
        
        <form className={classes.form} noValidate onSubmit = {(e) => {
            e.preventDefault();
            auth(setToken, login, password);
            console.log("submit form");
        }}>
          <TextField
            value={login}
            onChange={handleChangelogin}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            
            autoFocus
          />
          <TextField
            value={password}
            onChange={handleChangePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Регистрация"}
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

      <Box mt={8}>
        <Copyright/>
      </Box>

    </Container>
  );
}
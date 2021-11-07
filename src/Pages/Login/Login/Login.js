import { Container, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png';

const Login = () => {
  const [loginData, setLoginData] = useState({});
const {user, loginUser,signInWithGoogle, isLoading, authError} = useAuth();

const location = useLocation();
const history = useHistory();



  // const handleonBlur = e => {
  const handleOnBlur = e => {
    const field = e.target.name;
    const value = e.target.value;
    console.log(field, value);
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    console.log(newLoginData);
    
    setLoginData(newLoginData);
  }
  const handleLoginSubmit = e => {
  loginUser(loginData.email, loginData.password, location, history);
    e.preventDefault();
  }

//*******************handle google sign in********************
const handleGoogleSignIn = () => {
  signInWithGoogle (location, history);
}

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sx={{ mt: 9 }} xs={12} md={6}>
          <Typography variant="body1" gutterBottom>  Login </Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField id="standard-basic"
              sx={{ width: '80%', m: 1 }}
              label="Your Name"
              name="name"
              type="text"
              onBlur={handleOnBlur}
              variant="standard" />

            <TextField id="standard-basic"
              sx={{ width: '80%', m: 1 }}
              label="Your Email"
              name="email"
              type="email"
              onBlur={handleOnBlur}
              variant="standard" />

            <TextField id="standard-basic"
              sx={{ width: '80%', m: 1 }}
              type="password"
              name="password"
              onBlur={handleOnBlur}
              label="Your password"
              variant="standard" />


            <Button sx={{ width: '80%', m: 1 }} type="submit" variant="contained">Login</Button>
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/register">
              <Button sx={{ width: '80%', m: 1 }} variant="text">New User? Please Register</Button>
            </NavLink>
            {isLoading && <CircularProgress />}
          {
            user?.email && <Alert severity="success">Congrats you success!!</Alert>
          }
          {
            authError && <Alert severity="error">{authError}</Alert>
          }
          </form>
          <p>***************************************************</p>
          <Button onBlur={handleGoogleSignIn} variant="contained">Google Sign In</Button>

        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: '100%' }} src={login} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
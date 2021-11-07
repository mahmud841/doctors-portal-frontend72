import React from 'react';
import { Container, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import login from '../../../images/login.png';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  // useFirebase theke registeruser call kore akhane ante hobe 
  const { user, registerUser, isLoading, authError } = useAuth();

  // const handleonBlur = e => {
  const handleOnBlur = e => {
    const field = e.target.name;
    const value = e.target.value;
    // console.log(field, value);
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  }
  const handleLoginSubmit = e => {
    // alert("Submitted")
    if (loginData.password !== loginData.password2) {
      alert("Your password didn't match");
      return;
    }
    registerUser(loginData.email, loginData.password,loginData.name, history);
    e.preventDefault();
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sx={{ mt: 9 }} xs={12} md={6}>
          <Typography variant="body1" gutterBottom>  Register </Typography>
          {!isLoading && <form onSubmit={handleLoginSubmit}>
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
              onBlur={handleOnBlur}
              label="Your password"
              name="password"
              variant="standard" />

            <TextField id="standard-basic"
              sx={{ width: '80%', m: 1 }}
              type="password"
              name="password2"
              onBlur={handleOnBlur}
              label="Re-Type Your password"
              variant="standard" />


            <Button sx={{ width: '80%', m: 1 }} type="submit" variant="contained">Register</Button>
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/register">
              <Button sx={{ width: '80%', m: 1 }} variant="text">Alreadey register? Please Register</Button>
            </NavLink>
          </form>
          }
          {isLoading && <CircularProgress />}
          {
            user?.email && <Alert severity="success">Congrats you success!!</Alert>
          }
          {
            authError && <Alert severity="error">{authError}</Alert>
          }

        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: '100%' }} src={login} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
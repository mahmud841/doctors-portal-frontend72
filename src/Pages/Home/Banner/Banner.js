import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import bg from '../../../images/bg.png';
import chair from '../../../images/chair.png';
import { Button, Container, Typography } from '@mui/material';

const bannerBg = {
  background: `url(${bg})`,

}
const verticalCenter = {
  display: 'flex',
  alignItems: 'center',
  height: 450,
  // border: '2px solid tomato'
}

const Banner = () => {
  return (
    <Container style={{ bannerBg }} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item style={{...verticalCenter, textAlign: 'left' }} xs={12} md={6}>
          <Box>
            <Typography variant="h3">
              Your New Smile
            </Typography>
            <Typography variant="h6" sx={{my: 3, fontSize: 14, fontWeight: 300, color: 'gray' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eius rerum cumque voluptate officiis excepturi porro alias iure maxime deleniti.
            </Typography>
            <Button variant="contained" style={{ backgroundColor: '#5CE7ED' }}>
              Get Appointment
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} style={verticalCenter}>
          <img style={{ width: '360px' }} src={chair} alt="" />
        </Grid>


      </Grid>
    </Container>
  );
};

export default Banner;
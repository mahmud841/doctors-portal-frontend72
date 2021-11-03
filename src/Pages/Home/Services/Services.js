import React from 'react';
// import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';


const services = [
  {
    name: 'Fluoride Treatment',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque eos reiciendis tenetur quis, ab accusantium voluptas eveniet exercitationem porro magnam corporis, amet quasi facere, architecto sapiente distinctio nulla ipsa. Sit esse amet assumenda placeat?',
    img: fluoride
  },
  {
    name: 'Cavity Filling',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque eos reiciendis tenetur quis, ab accusantium voluptas eveniet exercitationem porro magnam corporis, amet quasi facere, architecto sapiente distinctio nulla ipsa. Sit esse amet assumenda placeat?',
    img: cavity
  },
  {
    name: 'Teeth Whitening',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque eos reiciendis tenetur quis, ab accusantium voluptas eveniet exercitationem porro magnam corporis, amet quasi facere, architecto sapiente distinctio nulla ipsa. Sit esse amet assumenda placeat?',
    img: whitening
  }
]

const Services = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
      <Typography sx={{fontWeight: 500, color:'success.main', m:3 }} variant="h6" color="text.secondary">
         Our Services
        </Typography>
      <Typography sx={{fontWeight: 600}} variant="h4" color="text.secondary">
          Services we provide 
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* {services.map((service, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <Service>
                service = {service}
              </Service>
            </Grid>
          ))} */}
          {
            services.map(service => <Service
              key={service.name}
              service={service}
            ></Service>)
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
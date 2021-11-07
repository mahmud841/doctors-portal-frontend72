import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from '../Booking/Booking';

const bookings = [
  {
    id: 1,
    name: 'Teeth Orthodonics',
    time: '08.00 AM - 09.00 AM',
    space: 10,
  },
  {
    id: 2,
    name: 'Cavity Orthodonics',
    time: '10.00 AM - 11.00 AM',
    space: 10,
  },
  {
    id: 3,
    name: 'Teeth Cleaning',
    time: '03.00 PM - 05.00 PM',
    space: 10,
  },
  {
    id: 4,
    name: 'Cosmetic Density',
    time: '08.00 AM - 09.00 AM',
    space: 10,
  },
  {
    id: 5,
    name: 'Cavity Protection',
    time: '08.00 AM - 09.00 AM',
    space: 10,
  },
  {
    id: 6,
    name: 'Oral Surgery',
    time: '09.00 AM - 10.00 AM',
    space: 10,
  }

]

const AvailableAppointment = ({ date }) => {
const [bookingSuccess, setBookingSuccess] = useState(false);

  return (
    <Container>
      <Typography variant="h4" sx={{color: 'info.main',mb:5}}>Appointment Available on {date.toDateString()} </Typography>
     {bookingSuccess && <Alert severity="success">Appointments Successfully Booked!!</Alert>}
      <Grid container spacing={2}>

        {/* <Grid item xs={12} sm={6} md={4}> */}
          {
            bookings.map(booking => <Booking
              key= {booking.id}
              booking={booking}
              date={date}
              setBookingSuccess={setBookingSuccess}
              >
            </Booking>)
          }

        {/* </Grid> */}
      </Grid>
    </Container>
  );
};

export default AvailableAppointment;
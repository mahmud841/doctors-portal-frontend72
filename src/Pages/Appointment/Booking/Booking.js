import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import React from 'react';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({booking,date, setBookingSuccess}) => {
  const { name, time, space } = booking;
  const [openBooking, setBookingOpen] = React.useState(false);
  const handleBookingOpen = () => setBookingOpen(true);
  const handleBookingClose = () => setBookingOpen(false);
 
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{py:5}}>
          <Typography sx={{ color: 'info.main' , fontWeight: 600 }} variant="h5" gutterBottom component="div">
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {time}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {space} Space Available
          </Typography>
        <Button onClick={handleBookingOpen} variant="contained">Book Appointment</Button>
        </Paper>
      </Grid>
      {/* // Modal use  */}
      <BookingModal
      date={date}
      booking={booking}
      openBooking={openBooking}
      handleBookingClose={handleBookingClose}
      setBookingSuccess={setBookingSuccess}
      
      >
       
      </BookingModal>
    </>
   
  );
};

export default Booking;
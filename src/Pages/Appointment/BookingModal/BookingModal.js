import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BookingModal = ({ handleBookingClose, openBooking, booking, date, setBookingSuccess }) => {
  const { name, time } = booking;
  const { user } = useAuth();

  const initialInformation = { patientName: user.displayName, email: user.email, phone: '' }

  const [bookingInfo, setBookingInfo] = useState(initialInformation);

  const handleOnBlur = e => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...bookingInfo }
    newInfo[field] = value;
    //  console.log(newInfo);

    setBookingInfo(newInfo)
  }

  const handleSubmitBtn = e => {
    // alert('submitting');
    // collect data 
    const appointment = {
      ...bookingInfo,
      time,
      serviceName: name,
      date: date.toLocaleDateString()
    }
    // send to the server 
    // console.log(appointment);
    fetch('http://localhost:5000/appointments',{
      method: 'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(appointment)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if(data.insertedId){
        setBookingSuccess(true);
        handleBookingClose();
      }
      
    })

      

    //data collect
    
    e.preventDefault();
  }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openBooking}
      onClose={handleBookingClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openBooking}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          {/*  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
         {time}
        </Typography> */}
          <form onSubmit={handleSubmitBtn} >
            <TextField
              disabled
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              size="small"
              defaultValue={time}
            />
            <TextField
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              name="patientName"
              onBlur={handleOnBlur}
              size="small"
              defaultValue={user.displayName}
            />
            <TextField
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              name="email"
              onBlur={handleOnBlur}
              size="small"
              // defaultValue="Your Email"
              defaultValue={user.email}
            />
            <TextField
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              size="small"
              name="phone"
              onBlur={handleOnBlur}
              defaultValue="Phone Number"
            />
            <TextField
              disabled
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              size="small"
              defaultValue={date.toDateString()}
            />
            <Button type="submit" variant="contained">Submit</Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookingModal;
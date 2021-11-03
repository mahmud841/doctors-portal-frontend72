import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

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

const BookingModal = ({ handleBookingClose, openBooking, booking, date }) => {
  const { name, time } = booking;

  const handleSubmitBtn = e => {
    alert('submitting');
    //data collect
    handleBookingClose()
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
              size="small"
              defaultValue="Your Name"
            />
            <TextField
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              size="small"
              defaultValue="Your Email"
            />
            <TextField
              sx={{ width: "100%", margin: 1 }}
              id="outlined-size-small"
              size="small"
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
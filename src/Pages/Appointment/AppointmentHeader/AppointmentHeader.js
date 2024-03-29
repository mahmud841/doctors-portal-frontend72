import { Container, Grid } from '@mui/material';
import React from 'react';
import chair from '../../../images/chair.png';
import Calendar from '../../Shared/Calender/Calendar';

const AppointmentHeader = ({date, setDate}) => {
  // const [date, setDate] = React.useState(new Date());
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Calendar date={date} setDate={setDate}></Calendar>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{width: '100%'}}  src={chair} alt="" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AppointmentHeader;
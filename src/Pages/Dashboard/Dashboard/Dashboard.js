import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {

  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import { Button } from '@mui/material';
import DashBoardHome from '../DashboardHome/DashBoardHome';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AddDoctor from '../AddDoctor/AddDoctor';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
// import Calendar from '../../Shared/Calender/Calendar';
// import Appointments from '../Appointments/Appointments';

const drawerWidth = 190;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { admin } = useAuth();
  // const [date, setDate] = React.useState(new Date());

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Link style={{ textDecoration: 'none', color: 'gray' }} to="/appointment">
        <Button color="inherit">Appointment</Button>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'gray' }} to={`${url}`}>
        <Button color="inherit">Dashboard </Button>
      </Link>
      {/* **************secure admin and Doctor ****************** */}
      {admin && <Box>
        <Link style={{ textDecoration: 'none', color: 'gray' }} to={`${url}/makeAdmin`}>
          <Button color="inherit">Make Admin</Button>
        </Link>
        <Link style={{ textDecoration: 'none', color: 'gray' }} to={`${url}/addDoctor`}>
          <Button color="inherit">Add Doctor</Button>
        </Link>


      </Box>}
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DashBoard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/*   <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Calendar
                date={date}
                setDate={setDate}
              ></Calendar>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Appointments date={date}></Appointments>
            </Grid>
          </Grid> */}

        <Switch>
          <Route exact path={path}>
            <DashBoardHome></DashBoardHome>
          </Route>
          <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
          <AdminRoute path={`${path}/addDoctor`}>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        </Switch>
      </Box>
    </Box >
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;

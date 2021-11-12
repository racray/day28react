import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import List from '@mui/material/List';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import SvgIcon from '@mui/material/SvgIcon';
import { AddColor } from './AddColor';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from './Home';
import { Drawer } from './Drawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { createContext, useContext } from 'react'
import Button from '@mui/material/Button';
import {Charts } from './Charts';
import AppsIcon from '@mui/icons-material/Apps';
const context = createContext({ modec: "black" });

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export const drawerWidth = 240;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function MiniDrawer() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [modec, setCmode] = useState("light")

  const theme = createTheme({
    palette: {
      mode: modec,
    },
  });




  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={{ width: "100vw", minHeight: "100vh" }}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Navigation Bar
              </Typography>
              <context.Provider value={{ modec, setCmode }}>
                <Typography variant="h6" noWrap component="div" style={{ marginLeft: "auto" }}>
                  <ToggleColorMode />
                </Typography>
              </context.Provider>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} className="drawer">
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem button key="Home">
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <Link to="/Home">Home</Link>
              </ListItem>
              <ListItem button key="DashBoard">
                <ListItemIcon>
                  <AppsIcon/>
                </ListItemIcon>
                <Link to="/DashBoard">Dashboard</Link>
              </ListItem>
              <ListItem button key="Components">
                <ListItemIcon>
                <AcUnitIcon color="primary"/>
                </ListItemIcon>
                <Link to="/Components">Components</Link>
              </ListItem>
              <ListItem button key="Utilities">
                <ListItemIcon>
                  <MailIcon color="primary" />
                </ListItemIcon>
                <Link to="/Utilities">Utilities</Link>
              </ListItem>
              <ListItem button key="Color Picker">
                <ListItemIcon>
                <ColorLensIcon color="primary" />
                </ListItemIcon>
                <Link to="/AddColor">Color Picker</Link>
              </ListItem>


            </List>

            <Divider />

          </Drawer>
          <Switch>
          <Route exact path="/DashBoard">
              <DashBoard />
            </Route>
            <Route exact path="/Components">
              <Components />
            </Route>

            <Route path="/Utilities">
              <Utilities />
            </Route>
            <Route path="/AddColor">
              <AddColor />
            </Route>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="**">
              Error Not Found
            </Route>
          </Switch>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}






function ToggleColorMode() {
  const { modec, setCmode } = useContext(context);
  const moded = modec === "dark" ? "light" : "dark";
  return (
    <div className="ToggleColor" style={
      {
        backgroundColor: modec === "dark" ? "brown" : "skyblue"
      }
    } >
      <Button onClick={() => {
        setCmode(modec === "dark" ? "light" : "dark")
      }}>
        {moded} mode : {modec === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </Button></div>
  );
}

function Components() {
  return <div className="Components"><h1>Welcome to Components</h1></div>

}

function Utilities() {
  return <div className="Utilities"><h1>Welcome to Utilities</h1></div>
}

function DashBoard() {
  return <div>
    <Charts/>
  </div>
}
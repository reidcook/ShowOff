import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import "./App.css"

export default function App() {

  let projects: string[] = ["Awesome Project", "Another super great project", "The HI SETH project"];

  return (
    <div className='height-100 d-flex flex-column'>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Showoff
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className="container height-100">
        <div className="row user-profile pt-2 pb-2 text-center">
          <div className="col height-100">
            <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 100, height: 100 }}
              >
                TU
              </Avatar>
            </Paper>
          </div>
          <div className="col-9 height-100">
            <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
              User Description
            </Paper>
          </div>
        </div>
        {projects.map((proj) => {
          return (
          <div className="row project user-profile pt-2">
            <div className="col height-100">
              <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
                {proj}
              </Paper>
            </div>
          </div>)
        })}
        <div className="row project user-profile pt-2">
          <div className="col height-100">
            <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
              OTHER STUFF!!
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

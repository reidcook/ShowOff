import { AppBar, Toolbar, Button, IconButton, Paper, Avatar, Typography, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theming/theme';
import MenuIcon from '@mui/icons-material/Menu';
import "./App.css"

export default function App() {

  // > list of different projects
  const projects: string[] = ["Awesome Project", "Another super great project", "The HI SETH project", "The hello Reid project im trying to learn react and jsx all at once..."];

  return (
    // > ThemeProvider is used to apply the dark theme to the entire app
    // > AppBar is the top bar of the app
    <ThemeProvider theme={darkTheme}>
      <div className='height-100 d-flex flex-column'>
        {/* AppBar is the navigation bar at the top of the screen  */}
        <AppBar position="static">
          {/* Toolbar is used to align the items in the AppBar */}
          <Toolbar>
            {/* IconButton is used to create a button with an icon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Showoff
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {/* User Profile Section */}
        <div className="container height-100">
          <div className="row user-profile pt-2 pb-2 text-center">
            <div className="col height-100">
              <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
                <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }}>
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
          {/* List of projects */}
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
          {/* Extra section added on after the projects array */}
          <div className="row project user-profile pt-2">
            <div className="col height-100">
              <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
                OTHER STUFF!!
              </Paper>
            </div>
          </div>
          
        </div>
      </div>
    </ThemeProvider>
  );
}

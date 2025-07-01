import { AppBar, Toolbar, Button, IconButton, Paper, Avatar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./Profile.css"
import { useEffect, useState } from 'react';
import type { Project } from './Types/Project';
import type { User } from './Types/User';

export default function Profile() {

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<string>("")
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
      await fetchProjects();
      await fetchUser();
    };

  const fetchProjects = async () => {
    try{
      const res = await fetch('https://showoff-b95o.onrender.com/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) {
        console.error("Failed to fetch projects: ", error);
        setError(error)
      }
      else{
        const data: Array<Project> = await res.json();
        setProjects(data);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Failed to fetch projects: ", error);
      setError(error)
      setLoading(false)
    }
  }

  const fetchUser = async () => {
    try{
      const res = await fetch('https://showoff-b95o.onrender.com/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) {
        console.error("Failed to fetch user: ", error);
        setError(error)
      }
      else{
        const data: User = await res.json();
        setUserInfo(data);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Failed to fetch user: ", error);
      setError(error)
      setLoading(false)
    }
  }

  if(!loading){
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
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Showoff
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className="container height-100">
          <span>{userInfo?.username}</span>
          <div className="row user-profile pt-2 text-center">
            <div className="col height-100">
              <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
                <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }}>
                  {userInfo?.username.charAt(0)}
                </Avatar>
              </Paper>
            </div>
            <div className="col-9 height-100">
              <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
                {userInfo?.description ? userInfo.description : "No description provided"}
              </Paper>
            </div>
          </div>
          {/* List of projects */}
          {projects.map((proj) => {
            return (
            <div className="row project user-profile pt-2">
              <div className="col height-100">
                <Paper elevation={3} className='height-100' sx={{justifyItems: "center", padding: "10px", alignContent: "center"}}>
                  {proj.name}
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
    );
  }
  else{
    return(<>LOADING!!!!!!!!!!!!</>)
  }
}

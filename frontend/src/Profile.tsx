import { Avatar } from '@mui/material';
import "./Profile.css"
import { useEffect, useState } from 'react';
import type { Project } from './Types/Project';
import type { User } from './Types/User';
import Tile from "./Tile";

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
      setLoading(false);
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
      }
    } catch (error: any) {
      console.error("Failed to fetch projects: ", error);
      setError(error)
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
      }
    } catch (error: any) {
      console.error("Failed to fetch user: ", error);
      setError(error)
    }
  }

  if(!loading){
    return (
        <div className="container height-100 mt-2">
          <div className="row mt-2 text-center">
            <Tile cols={3}>
              <Avatar alt={userInfo?.username || "User"} sx={{ width: "150px", height: "150px", marginBottom: "1rem" }}>
                {userInfo?.username?.charAt(0)}
              </Avatar>
              <span style={{fontSize: "32px"}}>{userInfo?.username}</span>
            </Tile>
            <Tile cols={9}>
              {userInfo?.description ? userInfo.description : "No description provided"}
            </Tile>
          </div>
          {/* List of projects */}
            {projects.map((proj) => (
              <>
              <div className="row mt-2">
                <Tile key={proj.name} cols={12} style={{ minHeight: "100px" }}>
                  {proj.name}
                </Tile>
              </div>
              <div className="row mt-2">
                <Tile key={proj.name} cols={12} style={{ minHeight: "100px" }}>
                  {proj.name}
                </Tile>
              </div>
              <div className="row mt-2">
                <Tile key={proj.name} cols={12} style={{ minHeight: "100px" }}>
                  {proj.name}
                </Tile>
              </div>
              </>
            ))}
            {/* Extra section added on after the projects array */}
            <div className="row mt-2">
              <Tile cols={12} style={{ minHeight: "100px" }}>
                OTHER STUFF!!
              </Tile>
            </div>
        </div>
    );
  }
  else{
    return(<>LOADING!!!!!!!!!!!!</>)
  }
}

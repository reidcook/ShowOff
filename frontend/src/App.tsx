import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./Login";
import Profile from "./Profile";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

// Helper to check if JWT is expired
function isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
        const payload: { exp?: number } = jwtDecode(token);
        return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export default function App() {
    const location = useLocation();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        // Optionally, you can navigate to /login here if desired
        window.location.reload();
    }

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
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
            <Routes>
                <Route path="/login" element={
                    isTokenValid(token) ? <Navigate to="/profile" replace/> : <Login />
                } />
                <Route path="/profile" element={
                    isTokenValid(token) ? <Profile /> : <Navigate to="/login" replace/>
                } />
                <Route path="*" element={<Navigate to={"/profile"} replace/>} />
            </Routes>
        </div>
    );
}
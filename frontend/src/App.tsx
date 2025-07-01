import { Navigate, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./Login";
import Profile from "./Profile";

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
    const token = localStorage.getItem("token");
    const isAuthenticated = isTokenValid(token);


    return (
        <Routes>
            <Route path="/login" element={
                isAuthenticated ? <Profile /> : <Login />
            } />
            <Route path="/profile" element={
                isAuthenticated ? <Profile /> : <Navigate to="/login" replace/>
            } />
            <Route path="*" element={<Navigate to={"/profile"} replace/>} />
        </Routes>
    );
}
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";

export default function App() {
    const isAuthenticated = !!localStorage.getItem("token");


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
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login.jsx";
import Register from "../../pages/auth/Register.jsx";
import Home from "../../pages/home/Home.jsx";
function RoutesLinks() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default RoutesLinks;

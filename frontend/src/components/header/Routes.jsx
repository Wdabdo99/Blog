import { Routes, Route } from "react-router-dom";
import Login from "../../pages/auth/Login.jsx";
import Register from "../../pages/auth/Register.jsx";
import Home from "../../pages/home/Home.jsx";
import Posts from "../../pages/post/Posts.jsx";
//import Profile from "../../pages/profile/Profile.jsx";
import CreatePost from "../../pages/post/CreatePost.jsx";
function RoutesLinks() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Routes>
        </>
    );
}

export default RoutesLinks;

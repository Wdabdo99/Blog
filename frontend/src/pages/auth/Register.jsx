import style from "../auth/auth.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { registerApiCall } from "../../redex/apicalls/authApiCall.js";
import swal from "sweetalert";

const Register = () => {
    const { registerMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const formHandler = e => {
        e.preventDefault();
        if (username.trim() === "") return toast.error("Username is required");
        if (email.trim() === "") return toast.error("Email is required");
        if (password.trim() === "") return toast.error("Password is required");

        dispatch(registerApiCall({ username, email, password }));
    };
    const navigate = useNavigate();

    if (registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if (isOk) {
                navigate("/login");
            }
        });
    }

    return (
        <>
            <form className={style.form} onSubmit={formHandler}>
                <h2>register new user </h2>
                <lebal>username</lebal>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
                <lebal>email</lebal>
                <input
                    className={style.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <lebal>password</lebal>
                <input
                    className={style.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => {
                        setpassword(e.target.value);
                    }}
                />
                <button className={style.btn} type="submit">
                    register
                </button>
                <div className="form-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </>
    );
};

export default Register;

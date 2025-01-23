import style from "../auth/auth.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { loginApiCall } from "../../redex/apicalls/authApiCall.js";

const Login = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const formHandler = e => {
        e.preventDefault();
        if (email.trim() === "") return toast.error("Email is required");
        if (password.trim() === "") return toast.error("Password is required");
        dispatch(loginApiCall({ email, password }));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);
    return (
        <section>
            <form className={style.form} onSubmit={formHandler}>
                <h2>login user</h2>
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
                    login
                </button>
                <div className="form-footer">
                    forget password? <Link to="/register">click Here</Link>
                </div>
            </form>
        </section>
    );
};
export default Login;

import style from "./css/header.module.css";
import { Link } from "react-router-dom";

function AuthLinks() {
    return (
        <div className={style.authLinks}>
            <Link to="/login" className={style.btn}>
                login
            </Link>
            <Link to="/register" className={style.btn}>
                register
            </Link>
        </div>
    );
}

export default AuthLinks;

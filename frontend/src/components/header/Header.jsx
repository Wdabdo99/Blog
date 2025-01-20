import LogoHeader from "./LogoHeader.jsx";
import Navbar from "./Navbar.jsx";
import AuthLinks from "./AuthLinks.jsx";
import style from "./css/header.module.css";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
function Header() {
    const [toggle, setToggle] = useState(false);
    return (
        <header className={style.header}>
            <div>
                <IoMenu
                    className={style.menu}
                    onClick={() => {
                        setToggle(e => !e);
                    }}
                />
                <LogoHeader />
            </div>
            <Navbar toggle={toggle} setToggle={setToggle} />
            <AuthLinks />
        </header>
    );
}

export default Header;

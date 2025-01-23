import LogoHeader from "./LogoHeader.jsx";
import Navbar from "./Navbar.jsx";
import DropDown from "./DropDown.jsx";
import style from "./css/header.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
function Header() {
    const [toggle, setToggle] = useState(false);
    const { user } = useSelector(state => state.auth);
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
            <DropDown user={user} />
        </header>
    );
}

export default Header;

import style from "./css/navbar.module.css";
import { FaHouse } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useSelector } from "react-redux";
import { CiImport } from "react-icons/ci";
import { Link } from "react-router-dom";
function Navbar({ toggle, setToggle }) {
    const { user } = useSelector(state => state.auth);
    return (
        <>
            <nav
                style={{
                    clipPath:
                        toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    display: toggle && "block"
                }}
                className={style.navbar}
            >
                <ul className={style.navLinks}>
                    <li className={style.navLink}>
                        <FaHouse />
                        <Link onClick={() => setToggle(false)} to="/">
                            home
                        </Link>
                    </li>
                    <li className={style.navLink}>
                        <GrArticle />
                        <Link onClick={() => setToggle(false)} to="/posts">
                            posts
                        </Link>
                    </li>
                    {
                      user &&
                    <li className={style.navLink}>
                        <MdOutlineCreateNewFolder />
                        <Link
                            onClick={() => setToggle(false)}
                            to="/posts/create"
                        >
                            create
                        </Link>
                    </li>
                      
                    }
                    {user?.isAdmin && (
                        <li className={style.navLink}>
                            <CiImport />
                            <Link onClick={() => setToggle(false)} to="/admin">
                                admin
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;

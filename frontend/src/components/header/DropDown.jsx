import "./css/drop.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logoutApiCall } from "../../redex/apicalls/authApiCall";
import AuthLinks from "./AuthLinks.jsx";
import image from "../../components/header/baghdad.jpg";

function DropDown({ user }) {
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(true);

    const logoutHandler = () => {
        setDropdown(false);
        dispatch(logoutApiCall());
    };
    return (
        <div className="header-right">
            {user ? (
                <>
                    <div className="header-right-user-info">
                        <span
                            onClick={() => setDropdown(prev => !prev)}
                            className="header-right-username"
                        >
                            {user?.username}
                        </span>
                        <img
                            src={image}
                            alt="user"
                            className="header-right-user-photo"
                        />
                        {dropdown && (
                            <div className="header-right-dropdown">
                                <Link
                                    to={`/profile/${user?._id}`}
                                    className="header-dropdown-item"
                                    onClick={() => setDropdown(false)}
                                >
                                    <span>Profile</span>
                                </Link>
                                <div
                                    onClick={logoutHandler}
                                    className="header-dropdown-item"
                                >
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <AuthLinks />
            )}
        </div>
    );
}

export default DropDown;

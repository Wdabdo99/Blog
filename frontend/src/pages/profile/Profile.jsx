import "./profile.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    profileApiCall,
    deleteProfile
} from "../../redex/apicalls/profileApiCall.js";
//import { logoutUser } from "../../redex/apicalls/authApiCall.js";
import Post from "../../components/home/Post.jsx";
import UpdateProfileModal from "./UpdateProfile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export default function Profile() {
    const { id } = useParams();
    const { profile } = useSelector(state => state.profile);
    const { user } = useSelector(state => state.auth);
    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);
    const dispatch = useDispatch();

    const formSubmitHandler = e => {
        e.preventDefault();
        if (!file) return toast.error("image is required");
    };
    const deleteAccountHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(isOk => {
            if (isOk) {
                dispatch(deleteProfile(user?.id));
                //dispatch(logoutUser());
            }
        });
    };
    useEffect(() => {
        dispatch(profileApiCall(id));
    }, [id]);
    return (
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={profile?.profilePhoto}
                        alt="profile"
                        className="profile"
                    />
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">{profile?.bio}</p>
                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {user?.id === profile?.id && (
                    <button
                        onClick={() => setUpdateProfile(true)}
                        className="profile-update-btn"
                    >
                        Update Profile
                    </button>
                )}
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">
                    {profile?.username} Posts
                </h2>
                {profile?.posts?.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        username={profile?.username}
                        userId={profile?.id}
                    />
                ))}
            </div>
            {user?.id === profile?.id && (
                <button
                    onClick={deleteAccountHandler}
                    className="delete-account-btn"
                >
                    Delete Your Account
                </button>
            )}
            {updateProfile && (
                <UpdateProfileModal
                    profile={profile}
                    setUpdateProfile={setUpdateProfile}
                />
            )}
        </section>
    );
}

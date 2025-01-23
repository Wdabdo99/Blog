import { authActions } from "../slices/authSlice.js";
import request from "../../utiles/request.js";
import { toast } from "react-toastify";

export function registerApiCall(newUser) {
    return async dispatch => {
        try {
            const { data } = await request.post("/auth/register", newUser);
            dispatch(authActions.register(data?.message));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

export function loginApiCall(u) {
    return async dispatch => {
        try {
            const { data } = await request.post("/auth/login", u);
            localStorage.setItem("userInfo", JSON.stringify(data?.user));
            dispatch(authActions.login(data?.user));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
export function logoutApiCall() {
    return async dispatch => {
        try {
            localStorage.removeItem("userInfo");
            dispatch(authActions.logout());
            toast.error("Log Out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

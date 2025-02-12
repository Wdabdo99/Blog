import { profileActions } from "../slices/profileSlice.js";
import request from "../../utiles/request.js";
import { toast } from "react-toastify";

export function profileApiCall(id) {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.get(`/users/${id}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
      
                }
            });
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}


export function deleteProfile(id) {
    return async (dispatch,getState) => {
        try {
            await request.delete(`/users/${id}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
      
                }
            });
            //dispatch(profileActions.setProfile(data));
            toast.error('profile deleted');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

export function updateProfile(id,updata) {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.put(`/users/${id}`,updata, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(profileActions.setProfile(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

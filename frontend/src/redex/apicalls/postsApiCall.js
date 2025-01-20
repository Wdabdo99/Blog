import { postActions } from "../slices/postSlice.js";
import request from "../../utiles/request.js";
import { toast } from "react-toastify";

export function postsApiCall() {
    return async dispatch => {
        try {
            const { data } = await request.get("/posts");
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

export function postApiCall(postId) {
    return async dispatch => {
        try {
            const { data } = await request.get(`/posts/${postId}`);
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

import { postActions } from "../slices/postSlice.js";
import request from "../../utiles/request.js";
import { toast } from "react-toastify";

export function postsApiCall(n = 1) {
    return async dispatch => {
        try {
            const { data } = await request.get(`/posts?pageNumber=${n}`);
            dispatch(postActions.setPosts(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

export function postsbyCategoryApiCall(c) {
    return async dispatch => {
        try {
            const { data } = await request.get(`/posts?category=${c}`);
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

export function newPostApiCall(newPost) {
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading());
            await request.post(`/posts`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });

            dispatch(postActions.setPostCreated());
            setTimeout(function () {
                dispatch(postActions.clearPostCreated());
                dispatch(postActions.clearLoading());
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

export function updatePostApiCall(updatePost, postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/posts/${postId}`, updatePost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });

            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

export function deletePostApiCall(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/posts/${postId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });

            dispatch(postActions.setDeletePost(data.message));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

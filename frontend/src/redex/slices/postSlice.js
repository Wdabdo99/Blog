import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        post: null,
        postCreated: false,
        deleteMessage: "",
        loading: false
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setPost(state, action) {
            state.post = action.payload;
        },
        setUpdatePost(state, action) {
            state.post = action.payload;
        },
        setDeletePost(state, action) {
            state.deleteMessage = action.payload;
        },
        setPostCreated(state) {
            state.postCreated = true;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearPostCreated(state) {
            state.postCreated = false;
        },
        clearLoading(state) {
            state.loading = false;
        }
    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer };

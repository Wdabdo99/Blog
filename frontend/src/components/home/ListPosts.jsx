import { useEffect } from "react";
import Post from "./Post.jsx";
import { useSelector, useDispatch } from "react-redux";
import { postsApiCall } from "../../redex/apicalls/postsApiCall.js";
import style from "./home.module.css";

function ListPosts() {
    const { posts } = useSelector(state => state.post);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postsApiCall());
    });

    return (
        <>
            <div className={style.posts}>
                {posts?.map(post => {
                    return <Post post={post} />;
                })}
            </div>
        </>
    );
}

export default ListPosts;

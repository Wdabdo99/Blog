import ListPosts from "../../components/home/ListPosts.jsx";
import Categories from "../../components/home/Categories.jsx";
import style from "./posts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { postsApiCall } from "../../redex/apicalls/postsApiCall.js";

function Posts() {
    const { posts } = useSelector(state => state.post);

    // const postPrePage = 4;

    const { pageNumber } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postsApiCall(pageNumber));
    });
    return (
        <section className={style.home}>
            <h2 className={style.head}>all posts</h2>
            <div className={style.content}>
                <ListPosts posts={posts} />
                <Categories />
            </div>
        </section>
    );
}

export default Posts;

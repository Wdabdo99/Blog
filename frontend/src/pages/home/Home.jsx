import HeroHeader from "../../components/header/HeroHeader.jsx";
import ListPosts from "../../components/home/ListPosts.jsx";
import Categories from "../../components/home/Categories.jsx";
import style from "./home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { postsApiCall } from "../../redex/apicalls/postsApiCall.js";

function Home() {
    const { posts } = useSelector(state => state.post);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postsApiCall(1));
    });
    return (
        <section className={style.home}>
            <HeroHeader />
            <h2 className={style.head}>latest posts</h2>
            <div className={style.content}>
                <ListPosts posts={posts} />
                <Categories />
            </div>
        </section>
    );
}

export default Home;

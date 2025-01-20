import HeroHeader from "../../components/header/HeroHeader.jsx";
import ListPosts from "../../components/home/ListPosts.jsx";
import Categories from "../../components/home/Categories.jsx";
import style from "./home.module.css";

function Home() {
    
    return (
        <section className={style.home}>
            <HeroHeader />
            <h2 className={style.head}>latest posts</h2>
            <div className={style.content}>
                <ListPosts />
                <Categories />
            </div>
        </section>
    );
}

export default Home;

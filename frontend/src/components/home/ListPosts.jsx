import Post from "./Post.jsx";

import style from "./home.module.css";

function ListPosts({ posts }) {
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

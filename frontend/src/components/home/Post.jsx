import style from "./post.module.css";

function Post({ post }) {
    return (
        <>
            <div className={style.post}>
                <img src={post.postImage} alt="alt" />
                <div className={style.auther}>
                    <h3>{post?.user?.username}</h3>
                    <span>{post?.createdAt}</span>
                </div>
                <div className={style.title}>
                    <span>{post?.title}</span>
                    <span>{post?.category}</span>
                </div>
                <p>{post?.desc}</p>
            </div>
        </>
    );
}

export default Post;

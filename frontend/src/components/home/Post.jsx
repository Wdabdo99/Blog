import style from "./post.module.css";
import { Link } from "react-router-dom";

function Post({ post,username,userId }) {
    return (
        <>
            <div className={style.post}>
                <img src={post.postImage} alt="alt" />
                <div className={style.auther}>
                    <Link to={`/profile/${userId}`}>
                        {username}
                    </Link>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
                <div className={style.title}>
                    <span>{post?.title}</span>
                    <Link to={`/posts/?category=${post.category}`}>
                        {post?.category}
                    </Link>
                </div>
                <p>
                    {post?.desc.slice(0, 125)}
                    <Link to={`/posts/${post.id}`}> Read More</Link>
                </p>
            </div>
        </>
    );
}

export default Post;

import style from "./posts.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { categoriesApiCall } from "../../redex/apicalls/categoryApiCall.js";
import { newPostApiCall } from "../../redex/apicalls/postsApiCall.js";

const CreatePost = () => {
    const { categories } = useSelector(state => state.category);
    const { postCreated,loading } = useSelector(state => state.post);

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const formHandler = e => {
        e.preventDefault();
        if (title.trim() === "") return toast.error("title is required");
        if (desc.trim() === "") return toast.error("desc is required");
        if (category.trim() === "") return toast.error("category is required");
        if (!image) return toast.error("file is required");

        const formPost = new FormData();
        formPost.append("title", title);
        formPost.append("desc", desc);
        formPost.append("category", category);
        formPost.append("image", image);

        dispatch(newPostApiCall(formPost));
    };
    useEffect(() => {
        dispatch(categoriesApiCall());
    });

    const navigate = useNavigate();
    useEffect(() => {
    if (postCreated) {
        navigate("/");
    }
        
    },[postCreated,navigate]);
    return (
        <section className={style.createpost}>
            <h1 className={style.createposttitle}>Create New Post</h1>
            <form onSubmit={formHandler} className={style.createpostform}>
                <input
                    type="text"
                    placeholder="Post Title"
                    className={style.createpostinput}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={style.createpostinput}
                >
                    <option disabled value="">
                        Select A Category
                    </option>
                    {categories.map(category => (
                        <option key={category._id} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <textarea
                    className={style.createposttextarea}
                    rows="5"
                    placeholder="Post Description"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className={style.createpostupload}
                    onChange={e => setImage(e.target.files[0])}
                />
                <button type="submit" className={style.createpostbtn}>
                    {loading ? ("...loading"
                    ) : (
                        "Create"
                    )}
                </button>
            </form>
        </section>
    );
};
export default CreatePost;

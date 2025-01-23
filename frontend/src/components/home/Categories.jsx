import style from "./home.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { categoriesApiCall } from "../../redex/apicalls/categoryApiCall.js";

function Categories() {
    const { categories } = useSelector(state => state.category);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categoriesApiCall());
    });
    return (
        <>
            <div className={style.categories}>
                <h1>categories</h1>
                <div className={style.content}>
                    {categories?.map(c => {
                        return <Link
                        to={`/posts?category=${c.title}`} className={style.ca}>{c.title}</Link>;
                    })}
                </div>
            </div>
        </>
    );
}

export default Categories;

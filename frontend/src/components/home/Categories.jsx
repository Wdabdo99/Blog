import style from "./home.module.css";
import { useEffect } from "react";

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
                {categories?.map(category => {
                    return (
                        <div>
                            <h1>{category.title}</h1>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Categories;

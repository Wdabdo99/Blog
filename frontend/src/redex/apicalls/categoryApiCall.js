import { categoryActions } from "../slices/categorySlice.js";
import request from "../../utiles/request.js";
import { toast } from "react-toastify";

export function categoriesApiCall() {
    return async dispatch => {
        try {
            const { data } = await request.get("/category");
            dispatch(categoryActions.setCategories(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
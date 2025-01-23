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
export function newcategoryApiCall(newCategory) {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.post(`/category`, newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(categoryActions.addCategory(data));
            toast.success("category created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}
export function deletecategoryApiCall(categoryId) {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}

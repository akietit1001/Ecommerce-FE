import axiosClient from "./AxiosClient";

export const categoriesApi = {
    // Get all categories
    getAllcategories: async(url) => {
        try {
            const response = await axiosClient.get(url);
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error);
        }
    },

    createCategory: async(url, params) => {
        try {
            const response = await axiosClient.post(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    updateCategory: async(url, params) => {
        try {
            const response = await axiosClient.put(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    deleteCategory: async(url, params) => {
        try {
            const response = await axiosClient.delete(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },
}
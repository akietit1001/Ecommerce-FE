import axiosClient from "./AxiosClient";

export const productApi = {
    // Get all categories
    getAllproducts: async(url) => {
        try {
            const response = await axiosClient.get(url);
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error);
        }
    },

    createProduct: async(url) => {
        try {
            const response = await axiosClient.post(url)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    updateProduct: async(url, params) => {
        try {
            const response = await axiosClient.put(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    deleteProduct: async(url, params) => {
        try {
            const response = await axiosClient.delete(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    getPhotoProduct: async(url) => {
        try {
            const response = await axiosClient.get(url)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    getSingleProduct: async(url) => {
        try {
            const response = await axiosClient.get(url)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    getFilterProducts: async(url, params) => {
        try {
            const response = await axiosClient.post(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },


    getTotal: async(url) => {
        try {
            const response = await axiosClient.get(url)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    },

    getLoadMore: async(url, params) => {
        try {
            const response = await axiosClient.get(url, params)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}
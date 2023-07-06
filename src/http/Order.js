import axiosClient from "./AxiosClient"

export const orderApi = {
    getOrders: async(url) => {
        const response = await axiosClient.get(url)
        if (response.data) {
            return response.data
        }
    },

    getAllOrders: async(url) => {
        const response = await axiosClient.get(url)
        if (response.data) {
            return response.data
        }
    },

    updateStatus: async(url, params) => {
        const response = await axiosClient.put(url, params)
        if (response.data) {
            return response.data
        }
    }
}
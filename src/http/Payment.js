import axiosClient from "./AxiosClient"

export const paymentApi = {
    getToken: async(url) => {
        const response = await axiosClient.get(url)
        if (response.data) {
            return response.data
        }
    },

    payment: async(url, params) => {
        const response = await axiosClient.post(url, params)
        if (response.data) {
            return response.data
        }
    }
}
import axiosClient from "./AxiosClient"

const searchApi = {
    searchProducts: async(url) => {
        try {
            const response = await axiosClient.get(url)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default searchApi;
import axiosClient from "./AxiosClient"

const relatedProductsApi = async(pid, cid) => {
    try {
        const response = await axiosClient.get(`/api/v1/product/related-products/${pid}/${cid}`)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export default relatedProductsApi;
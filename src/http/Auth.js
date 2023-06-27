import axiosClient from "./AxiosClient";

const Auth = {
    signUp: async(url, params) => {
        const response = await axiosClient.post(url, params)
        if (response.data) {
            return response.data
        }
    },

    signIn: async(url, params) => {
        const response = await axiosClient.post(url, params)
        if (response.data) {
            const token = response.token
            localStorage.setItem('token', token)
            return response.data
        }
    },

    forgotPassword: async(url, params) => {
        const response = await axiosClient.post(url, params)
        if (response.data) {
            return response.data
        }
    },

    authCheck: async(url) => {
        const response = await axiosClient.get(url)
        if (response.data) {
            return response.data
        }
    }
}

export default Auth;
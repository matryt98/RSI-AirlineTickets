import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: "http://localhost:5148/"
})

export default axiosInstance
import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: "https://localhost:5148/"
})

axiosInstance.interceptors.response.use(
	response => { return response },
	error => {
		if (
			error.request.responseType === 'blob' &&
			error.response.data instanceof Blob &&
			error.response.data.type &&
			error.response.data.type.toLowerCase().indexOf('json') !== -1
		)
		{
			return new Promise((resolve, reject) => {
				let reader = new FileReader()
				reader.onload = (e: any) => {
					error.response.data = JSON.parse(e.target.result)
					resolve(Promise.reject(error))
				}
				
				reader.onerror = () => {
					reject(error)
				}

				reader.readAsText(error.response.data)
			})
		}

		return Promise.reject(error)
	}
)

export default axiosInstance
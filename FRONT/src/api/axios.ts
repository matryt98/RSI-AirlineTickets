import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: "https://localhost:5148/"
})

axiosInstance.interceptors.response.use(
	response => { return response },
	error => {
		if (
			error.request.responseType === 'blob' &&
			error.response.data instanceof Blob
		)
		{
			return new Promise((resolve, reject) => {
				let reader = new FileReader()
				reader.onload = (e: any) => {
					if(error.response.data.type && error.response.data.type.toLowerCase().indexOf('json') !== -1)
						error.response.data = JSON.parse(e.target.result)
					else
						error.response.data = String(e.target.result)
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
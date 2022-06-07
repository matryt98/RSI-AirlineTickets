import { City } from 'types/interfaces'
import axiosInstance from './axios'

/**
 * This class is used for communication with API
 * 
 * Sample usage:
 * 
 * 	public async getSomeData(request: RequestType) {
 * 		return await this.api.get<ResponseType>(
 * 			'url_to_the_endpoint',
 * 			request
 * 		)
 * 	}
 */

class Api {
	private axios = axiosInstance

	// add api request methods below

	public async getCities() {
		return await this.axios.get<City[]>("Cities")
	}
	
}

export default Api
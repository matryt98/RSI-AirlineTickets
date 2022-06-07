import { City, Flight } from 'types/interfaces'
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
		return await this.axios.get<City[]>('Cities')
	}

	public async getFlightsByCity(cityFrom?: string, cityTo?: string) {
		const params = new URLSearchParams()
		if(cityFrom) params.append('cityFrom', cityFrom)
		if(cityTo) params.append('cityTo', cityTo)

		return await this.axios.get<Flight[]>(`Flights/ByCity?${params}`)
	}
	
}

export default Api
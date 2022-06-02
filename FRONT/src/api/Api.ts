import { Message } from 'types/interfaces'
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

	public async getMessages() {
		return await this.axios.get<Message[]>("Messages/GetMessages")
	}

	public async deleteMessage(id: number) {
		const params = new URLSearchParams()
		params.append('id', id.toString())

		return await this.axios.delete(`Messages/DeleteMessage?${params}`)
	}
	
}

export default Api
import { AxiosRequestConfig } from 'axios'
import { City, Flight, FlightDto, Reservation } from 'types/interfaces'
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

	public async getFlightsByCity(date: Date, cityFrom?: string, cityTo?: string) {
		const params = new URLSearchParams()
		params.append('date', date.toLocaleString())
		if(cityFrom) params.append('cityFrom', cityFrom)
		if(cityTo) params.append('cityTo', cityTo)

		return await this.axios.get<FlightDto[]>(`Flights/Search?${params}`)
	}

	public async getFlight(id: number) {
		return await this.axios.get<Flight>(`Flights/${id}`)
	}

	public async createReservation(reservation: Reservation) {
		const options: AxiosRequestConfig = {
			responseType: 'blob',
		}

		return await this.axios.post('Reservations', reservation, options)
	}
	
}

export default Api
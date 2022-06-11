import { AxiosRequestConfig } from 'axios'
import { AuthFormValues, City, Flight, FlightDto, Reservation } from 'types/interfaces'
import axiosInstance from './axios'
import { Buffer } from 'buffer'

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

	public async createReservation(reservation: Reservation, authInfo: AuthFormValues) {
		const options: AxiosRequestConfig = {
			responseType: 'blob',
			headers: {
				"Authorization": `Basic ${Buffer.from(`${authInfo.login}:${authInfo.password}`).toString('base64')}`
			},
		}

		return await this.axios.post('Reservations', reservation, options)
	}

	public async getReservation(id: number) {
		return await this.axios.get<Reservation>(`Reservations/${id}`)
	}

	public async generatePdf(id: number) {
		const options: AxiosRequestConfig = {
			responseType: 'blob',
		}

		const params = new URLSearchParams()
		params.append('reservationId', id.toString())

		return await this.axios.post(`Reservations/GeneratePDF?${params}`, undefined, options)
	}

	public async authenticate(payload: AuthFormValues) {
		const options: AxiosRequestConfig = {
			headers: {
				"Authorization": `Basic ${Buffer.from(`${payload.login}:${payload.password}`).toString('base64')}`
			},
		}

		return await this.axios.post('Users/Authenticate', undefined, options)
	}
	
}

export default Api
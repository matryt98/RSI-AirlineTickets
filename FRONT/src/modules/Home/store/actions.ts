import { Api } from "api"
import { createApiCall, createApiCallWithPayload } from "app/helpers/store"

interface GetFlightsByCityPayload {
	cityFrom?: string
	cityTo?: string
}

const api = new Api()

export const getCities = createApiCall(
	'home/getCities',
	api.getCities()
)

export const getFlightsByCity = createApiCallWithPayload(
	'home/getFlightsByCity',
	(payload: GetFlightsByCityPayload) => api.getFlightsByCity(payload.cityFrom, payload.cityTo)
)
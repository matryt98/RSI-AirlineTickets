import { createAction } from "@reduxjs/toolkit"
import { Api } from "api"
import { createApiCall, createApiCallWithPayload, createApiCallWithPayloadReturnResponse } from "app/helpers/store"
import { AuthFormValues, Reservation } from "types/interfaces"

interface GetFlightsByCityPayload {
	date: Date
	cityFrom?: string
	cityTo?: string
}

interface MakeReservationPayload {
	reservation: Reservation
	authInfo: AuthFormValues
}

const api = new Api()

export const getCities = createApiCall(
	'home/getCities',
	api.getCities()
)

export const getFlightsByCity = createApiCallWithPayload(
	'home/getFlightsByCity',
	(payload: GetFlightsByCityPayload) =>
		api.getFlightsByCity(payload.date, payload.cityFrom, payload.cityTo)
)

export const getFlight = createApiCallWithPayload(
	'home/getFlight',
	(id: number) =>
		api.getFlight(id)
)

export const makeReservation = createApiCallWithPayloadReturnResponse(
	'home/makeReservation',
	(payload: MakeReservationPayload) =>
		api.createReservation(payload.reservation, payload.authInfo)
)

export const getReservation = createApiCallWithPayload(
	'home/getReservation',
	(id: number) => api.getReservation(id)
)

export const generatePdf = createApiCallWithPayloadReturnResponse(
	'home/generatePdf',
	(id: number) =>
		api.generatePdf(id)
)

export const authenticate = createApiCallWithPayload(
	'home/authenticate',
	(payload: AuthFormValues) => api.authenticate(payload)
)

export const setSelectedFlightId = createAction<number>('home/setSelectedFlightId')
export const openBuyTicketDialog = createAction<AuthFormValues>('home/openBuyTicketDialog')
export const closeBuyTicketDialog = createAction('home/closeBuyTicketDialog')
export const closeReservationDetailsDialog = createAction('home/closeReservationDetailsDialog')
export const openAuthDialog = createAction('home/openAuthDialog')
export const closeAuthDialog = createAction('home/closeAuthDialog')
import { createAction } from "@reduxjs/toolkit"
import { Api } from "api"
import { createApiCall, createApiCallWithPayload, createApiCallWithPayloadReturnResponse } from "app/helpers/store"
import { Reservation } from "types/interfaces"

interface GetFlightsByCityPayload {
	date: Date
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
	(payload: GetFlightsByCityPayload) =>
		api.getFlightsByCity(payload.date, payload.cityFrom, payload.cityTo)
)

export const getFlight = createApiCallWithPayload(
	'home/getFlight',
	(payload: number) =>
		api.getFlight(payload)
)

export const makeReservation = createApiCallWithPayloadReturnResponse(
	'home/makeReservation',
	(payload: Reservation) =>
		api.createReservation(payload)
)

export const openBuyTicketDialog = createAction<number>('home/openBuyTicketDialog')
export const closeBuyTicketDialog = createAction('home/closeBuyTicketDialog')
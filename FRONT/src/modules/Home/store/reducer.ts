import { createReducer, isAnyOf } from "@reduxjs/toolkit"
import { City, FlightDto, Reservation } from "types/interfaces"
import * as actions from './actions'

interface State {
	cities: City[]
	flights: FlightDto[]
	isBuyTicketDialogOpen: boolean
	selectedFlightId: number
	isReservationDetailsDialogOpen: boolean
	reservation: Reservation | null
}

const initialState: State = {
	cities: [],
	flights: [],
	isBuyTicketDialogOpen: false,
	selectedFlightId: 0,
	isReservationDetailsDialogOpen: false,
	reservation: null,
}

export default createReducer(initialState, builder =>
	builder
		.addCase(actions.openBuyTicketDialog, (state, action) => {
			state.selectedFlightId = action.payload
			state.isBuyTicketDialogOpen = true
		})
		.addCase(actions.getCities.fulfilled, (state, action) => {
			state.cities = action.payload
		})
		.addCase(actions.getFlightsByCity.fulfilled, (state, action) => {
			state.flights = action.payload
		})
		.addCase(actions.getReservation.fulfilled, (state, action) => {
			state.reservation = action.payload
			state.isReservationDetailsDialogOpen = true
		})
		.addCase(actions.closeReservationDetailsDialog, state => {
			state.isReservationDetailsDialogOpen = false
		})
		.addMatcher(
			isAnyOf(
				actions.closeBuyTicketDialog,
				actions.makeReservation.fulfilled
			), state => {
			state.selectedFlightId = 0
			state.isBuyTicketDialogOpen = false
		})
)
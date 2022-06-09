import { createReducer, isAnyOf } from "@reduxjs/toolkit"
import { City, FlightDto } from "types/interfaces"
import * as actions from './actions'

interface State {
	cities: City[]
	flights: FlightDto[]
	isBuyTicketDialogOpen: boolean
	selectedFlightId: number
}

const initialState: State = {
	cities: [],
	flights: [],
	isBuyTicketDialogOpen: false,
	selectedFlightId: 0
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
		.addMatcher(
			isAnyOf(
				actions.closeBuyTicketDialog,
				actions.makeReservation.fulfilled
			), state => {
			state.selectedFlightId = 0
			state.isBuyTicketDialogOpen = false
		})
)
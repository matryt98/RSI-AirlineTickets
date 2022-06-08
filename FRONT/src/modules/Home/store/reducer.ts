import { createReducer } from "@reduxjs/toolkit"
import { City, Flight } from "types/interfaces"
import * as actions from './actions'

interface State {
	cities: City[]
	flights: Flight[]
}

const initialState: State = {
	cities: [],
	flights: []
}

export default createReducer(initialState, builder =>
	builder
		.addCase(actions.getCities.fulfilled, (state, action) => {
			state.cities = action.payload
		})
		.addCase(actions.getFlightsByCity.fulfilled, (state, action) => {
			state.flights = action.payload
		})
)
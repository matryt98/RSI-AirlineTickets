import { createReducer } from "@reduxjs/toolkit"
import { City } from "types/interfaces"
import * as actions from './actions'

interface State {
	cities: City[]
}

const initialState: State = {
	cities: []
}

export default createReducer(initialState, builder =>
	builder
		.addCase(actions.getCities.fulfilled, (state, action) => {
			state.cities = action.payload
		})
)
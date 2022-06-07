import { AlertColor } from "@mui/material"
import { createReducer } from "@reduxjs/toolkit"
import * as actions from './actions'

interface State {
	isLoading: boolean
	isAlertOpen: boolean
  message: string
  type: AlertColor
}

const initialState: State = {
	isLoading: false,
	isAlertOpen: false,
  message: '',
  type: 'info'
}

export default createReducer(initialState, builder =>
	builder
		.addCase(actions.openAlert, (state, action) => {
			state.isAlertOpen = true
			state.message = action.payload.message
			state.type = action.payload.type
		})
		.addCase(actions.showError, (state, action) => {
			state.isAlertOpen = true
			state.message = action.payload
			state.type = 'error'
		})
		.addCase(actions.closeAlert, state => {
			state.isAlertOpen = false
		})
		.addCase(actions.showLoader, state => {
			state.isLoading = true
		})
		.addCase(actions.hideLoader, state => {
			state.isLoading = false
		})
)
import { createReducer } from "@reduxjs/toolkit"
import { Message } from "types/interfaces"
import * as actions from './actions'

interface State {
	isLoading: boolean
	messages: Message[]
}

const initialState: State = {
	isLoading: false,
	messages: []
}

export default createReducer(initialState, builder =>
	builder
		.addCase(actions.getMessages.pending, state => {
			state.isLoading = true
		})
		.addCase(actions.getMessages.fulfilled, (state, action) => {
			state.messages = action.payload
			state.isLoading = false
		})
		.addCase(actions.getMessages.rejected, state => {
			state.isLoading = false
		})
		.addCase(actions.resetMessages, state => {
			state.messages = []
		})
)
import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Api } from "api"

const api = new Api()

export const getMessages = createAsyncThunk(
	'home/getMessages',
	async(_ , thunkAPI) => {
		const response = await api.getMessages()
		return response.data
	}
)

export const resetMessages = createAction('home/resetMessages')

export const deleteMessage = createAsyncThunk(
	'home/deleteMessage',
	async(id: number , thunkAPI) => {
		const response = await api.deleteMessage(id)
		return response.data
	}
)
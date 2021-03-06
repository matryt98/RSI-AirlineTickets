import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { hideLoader, showError, showLoader } from "modules/Shared/store"
import { extractErrorMessage } from "app/helpers/response"

/**
 * This method is used for creating actions making parametrized calls to API
 * 
 * Sample usage:
 * 
 * 	export const postSomething = createApiCall(
 * 		'reducerName/postSomething',
 * 		(payload: T) => api.postSomething(payload)
 * 	)
 */

export const createApiCallWithPayload = <T, P>(actionName: string, apiCall: (payload: P) => Promise<AxiosResponse<T, any>>) => createAsyncThunk<T, P>(
	actionName,
	async(payload: P, thunkAPI) => {
		try {
			thunkAPI.dispatch(showLoader())
			const response = await apiCall(payload)
				.finally(() => thunkAPI.dispatch(hideLoader()))
			return response.data
		}
		catch (err: any) {
			const errorMessage = extractErrorMessage(err)
			thunkAPI.dispatch(showError(errorMessage))
			return thunkAPI.rejectWithValue(errorMessage)
		}
	}
)

/**
 * This method is used for creating actions making calls to API
 * 
 * Sample usage:
 * 
 * 	export const getSomething = createApiCall(
 * 		'reducerName/getSomething',
 * 		api.getSomething()
 * 	)
 * 
 * @returns response.data
 */

export const createApiCall = <T>(actionName: string, apiCall: Promise<AxiosResponse<T, any>> ) => createAsyncThunk<T, void>(
	actionName,
	async(_, thunkAPI) => {
		try {
			thunkAPI.dispatch(showLoader())
			const response = await apiCall
				.finally(() => thunkAPI.dispatch(hideLoader()))
			return response.data
		}
		catch (err: any) {
			const errorMessage = extractErrorMessage(err)
			thunkAPI.dispatch(showError(errorMessage))
			return thunkAPI.rejectWithValue(errorMessage)
		}
	}
)

/**
 * This method is used for creating actions making parametrized calls to API
 * 
 * Sample usage:
 * 
 * 	export const postSomething = createApiCall(
 * 		'reducerName/postSomething',
 * 		(payload: T) => api.postSomething(payload)
 * 	)
 * 
 *  @returns response
 */

export const createApiCallWithPayloadReturnResponse = <T, P>(actionName: string, apiCall: (payload: P) => Promise<AxiosResponse<T, any>>) => createAsyncThunk(
	actionName,
	async(payload: P, thunkAPI) => {
		try {
			thunkAPI.dispatch(showLoader())
			const response = await apiCall(payload)
				.finally(() => thunkAPI.dispatch(hideLoader()))
			return response
		}
		catch (err: any) {
			const errorMessage = extractErrorMessage(err)
			thunkAPI.dispatch(showError(errorMessage))
			return thunkAPI.rejectWithValue(errorMessage)
		}
	}
)

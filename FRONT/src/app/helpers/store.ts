import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { hideLoader, showError, showLoader } from "modules/Shared/store"

/**
 * This method is used for creating actions making calls to API
 * 
 * Sample usage:
 * 
 * 	export const getSomething = createApiCall(
 * 		'reducerName/getSomething',
 * 			api.getSomething()
 * 		)
 * 
 */

export const createApiCall = <T>(actionName: string, apiCall: Promise<AxiosResponse<T, any>>) => createAsyncThunk<T, void>(
	actionName,
	async(_ , thunkAPI) => {
		try {
			thunkAPI.dispatch(showLoader())
			const response = await apiCall
				.finally(() => thunkAPI.dispatch(hideLoader()))
			return response.data
		}
		catch (err: any) {
			const errorMessage = err.response ? `${err.response.status} - ${err.response.statusText} ${typeof err.response?.data === 'string' ? err.response?.data : ''}` : err
			thunkAPI.dispatch(showError(String(errorMessage)))
			return thunkAPI.rejectWithValue(String(errorMessage))
		}
	}
)
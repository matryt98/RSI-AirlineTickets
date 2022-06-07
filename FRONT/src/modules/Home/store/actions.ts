import { Api } from "api"
import { createApiCall } from "app/helpers/store"

const api = new Api()

export const getCities = createApiCall(
	'home/getCities',
	api.getCities()
)
import { RootState } from "app/store"

export const getCities = (state: RootState) => state.home.cities
export const getFlights = (state: RootState) => state.home.flights
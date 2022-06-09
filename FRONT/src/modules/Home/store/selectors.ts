import { RootState } from "app/store"

export const getCities = (state: RootState) => state.home.cities
export const getFlights = (state: RootState) => state.home.flights
export const isBuyTicketDialogOpen = (state: RootState) => state.home.isBuyTicketDialogOpen
export const selectedFlightId = (state: RootState) => state.home.selectedFlightId
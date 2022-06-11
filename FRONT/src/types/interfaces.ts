import { AlertColor } from "@mui/material"
import { RouteProps } from "react-router"

export interface Module<Reducer> {
  routes: RouteProps[]
  reducer: Reducer
}

export interface AlertModel {
  message: string
  type: AlertColor
}

interface Entity {
  id: number
}

export interface City extends Entity {
  name: string
}

export interface Flight extends Entity {
  price: number
}

export interface FlightDto extends Entity {
  cityFrom: string
  cityTo: string
  departure: string
  arrival: string
  timeSpan: string
}

export interface Reservation extends Entity {
  flightId: number
}

export interface BuyTicketFormValues {
	name: string
	surname: string
	email: string
	numberOfTickets: number
}

export interface Reservation extends Entity {
  flightId: number
	name: string
	surname: string
	email: string
	tickets: number
}

export interface AuthFormValues {
	login: string
	password: string
}
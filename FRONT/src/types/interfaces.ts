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
  cityFromId: number
  cityToId: number
  departure: Date
  arrival: Date
}

export interface Reservation extends Entity {
  flightId: number
}

export interface Ticket extends Entity {
  reservationId: number
  name: string
  surname: string
  pesel: string
  price: string
}
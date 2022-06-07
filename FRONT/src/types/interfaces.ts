import { AlertColor } from "@mui/material"
import { RouteProps } from "react-router"

export interface Module<Reducer> {
  routes: RouteProps[]
  reducer: Reducer
}

export interface Message {
  id: number
  text: string
}

export interface AlertModel {
  message: string
  type: AlertColor
}
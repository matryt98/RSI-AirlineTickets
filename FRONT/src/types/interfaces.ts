import { RouteProps } from "react-router"

export interface Module<Reducer> {
  name: string
  routes: RouteProps[]
  reducer: Reducer
}

export interface Message {
  id: number
  text: string
}
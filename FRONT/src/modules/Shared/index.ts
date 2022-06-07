import { Module } from "types/interfaces"
import { reducer } from "./store"

const moduleConfig: Module<typeof reducer> = {
  reducer,
  routes: [],
}

export default moduleConfig

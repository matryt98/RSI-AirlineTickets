import { Module } from "types/interfaces"
import routes from "./routes"
import { reducer } from "./store"

const moduleConfig: Module<typeof reducer> = {
	name: "Home",
  reducer,
  routes,
}

export default moduleConfig

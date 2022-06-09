import { Grid } from "@mui/material"
import { selectors } from "modules/Home/store"
import { useSelector } from "react-redux"
import Flight from "./Flight"

const FlightsList = () => {
	const flights = useSelector(selectors.getFlights)

	return (
		<Grid item>
			{flights.map(flight => (
				<Flight key={flight.id} flight={flight} />
			))}
		</Grid>
	)
}

export default FlightsList
import { Box, Grid } from "@mui/material"
import { useAppDispatch } from "app/hooks"
import { AuthDialog, BuyTicketDialog, FlightSearch, FlightsList, ReservationDetailsDialog, ReservationSearch } from "modules/Home/components"
import { actions } from "modules/Home/store"
import { useEffect } from "react"

const Home = () => {
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		dispatch(actions.getCities())
	}, [])

	return (
		<Box p={2}>
			<AuthDialog />
			<BuyTicketDialog />
			<ReservationDetailsDialog/>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<ReservationSearch />
				<FlightSearch/>
				<FlightsList/>
			</Grid>
		</Box>
	)
}

export default Home
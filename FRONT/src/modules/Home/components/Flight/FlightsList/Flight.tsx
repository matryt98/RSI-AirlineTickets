import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Button, Grid, Paper, Typography } from "@mui/material"
import { displayDateHoursAndMinutes, displayTimeSpanHoursAndMinutes } from "app/helpers/date"
import { useAppDispatch } from "app/hooks"
import { actions } from "modules/Home/store"
import { FlightDto } from "types/interfaces"

interface FlightProps {
	flight: FlightDto
}

const Flight = (props: FlightProps) => {
	const { flight } = props

	const dispatch = useAppDispatch()

	const handleBuyTicket = () => {
		dispatch(actions.setSelectedFlightId(flight.id))
		dispatch(actions.openAuthDialog())
	}

	return (
		<Grid item xs={9} xl={7}>
			<Paper elevation={2} sx={{ padding: 2}}>
				<Grid container spacing={3} alignItems="center" justifyContent="center">
					<Grid item xs={3} container alignItems="center">
						<Grid item>
							<Typography
								variant="h5"
								sx={{ color: theme => theme.palette.primary.main }}
							>
								{flight.cityFrom}
							</Typography>
						</Grid>
						<Grid item>
							<NavigateNextIcon fontSize="large" viewBox="0 -3 24 24"/>
						</Grid>
						<Grid item>
							<Typography
								variant="h5"
								sx={{ color: theme => theme.palette.primary.main }}
							>
								{flight.cityTo}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={6} container alignItems="center" columnSpacing={4}>
						<Grid item>
							<Typography variant="h5">
								{displayDateHoursAndMinutes(flight.departure)} - {displayDateHoursAndMinutes(flight.arrival)}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body1">Travel Time:</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h5">
								{displayTimeSpanHoursAndMinutes(flight.timeSpan)}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							fullWidth
							color="secondary"
							onClick={handleBuyTicket}
						>
							Buy ticket
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}

export default Flight
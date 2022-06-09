import { Button, Grid, TextField, Typography } from "@mui/material"
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'
import { useState } from "react"
import { useAppDispatch } from "app/hooks"
import { actions } from "modules/Home/store"

const ReservationSearch = () => {
	const dispatch = useAppDispatch()
	const [value, setValue] = useState('')

	const handleClick = () => {
		dispatch(actions.getReservation(Number(value)))
	}

	return (
		<>
			<Grid item container justifyContent="center" alignItems="center">
				<AirplaneTicketIcon color="secondary" fontSize="large"/>
				<Typography 
					variant="h4"
					sx={{
						color: theme => theme.palette.primary.main,
					}}
				>
					Reservation Search
				</Typography>
			</Grid>
			<Grid item container justifyContent="center" alignItems="center" spacing={2}>
				<Grid item>
					<TextField
						margin="dense"
						size="small"
						label="Reservation Number"
						type="number"
						inputProps={{
							min: 1
						}}
						value={value}
						onChange={event => setValue(event.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						size="large"
						onClick={handleClick}
					>
						Search
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default ReservationSearch
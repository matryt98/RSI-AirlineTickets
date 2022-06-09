import { Grid, TextField, Typography } from "@mui/material"
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'
import { useState } from "react"

const ReservationSearch = () => {
	const [value, setValue] = useState('')

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
				<TextField
					margin="dense"
					label="Reservation Number"
					type="number"
					inputProps={{
						min: 1
					}}
					value={value}
					onChange={event => setValue(event.target.value)}
				/>
			</Grid>
		</>
	)
}

export default ReservationSearch
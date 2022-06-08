import { Autocomplete, Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { useAppDispatch } from "app/hooks"
import { actions, selectors } from "modules/Home/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlightIcon from '@mui/icons-material/Flight'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers"
import { City } from "types/interfaces"

const Home = () => {
	const dispatch = useAppDispatch()
	const cities = useSelector(selectors.getCities)
	const flights = useSelector(selectors.getFlights)

	const [cityFrom, setCityFrom] = useState<City | null>(null)
	const [cityTo, setCityTo] = useState<City | null>(null)
	const [date, setDate] = useState<Date | null>(null)
	const [time, setTime] = useState<Date | null>(null)

	useEffect(() => {
		dispatch(actions.getCities())
	}, [])

	const handleFindClick = () => {
		dispatch(actions.getFlightsByCity({
			cityFrom: cityFrom?.name,
			cityTo: cityTo?.name
		}))
		.unwrap()
		.then(data => console.log(data))
	}

	return (
		<Box p={2}>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item container justifyContent="center" alignItems="center">
					<FlightIcon color="secondary" fontSize="large"/>
					<Typography 
						variant="h3"
						sx={{
							color: theme => theme.palette.primary.main,
						}}
					>
						Flight Search
					</Typography>
				</Grid>
				<Grid item container justifyContent="center" alignItems="center" spacing={2}>
					<Grid item xs={2}>
						<Autocomplete
							options={cities}
							getOptionLabel={option => option.name}
							value={cityFrom}
							onChange={(_, value) => setCityFrom(value)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="From"
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<InputAdornment position="start">
												<LocationCityIcon />
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={2}>
						<Autocomplete
							options={cities}
							getOptionLabel={option => option.name}
							value={cityTo}
							onChange={(_, value) => setCityTo(value)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="To"
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<InputAdornment position="start">
												<LocationCityIcon />
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={2}>
						<DesktopDatePicker
							label="Date"
							inputFormat="DD.MM.yyyy"
							mask="__.__.____"
							value={date}
							disablePast
							onChange={(value) => setDate(value)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</Grid>
					<Grid item xs={2}>
						<TimePicker
							label="Time"
							ampm={false}
							value={time}
							onChange={(value) => setTime(value)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							fullWidth
							size="large"
							variant="contained"
							onClick={handleFindClick}
						>
							Find
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<ul>
						{flights.map(flight => (
							<li key={flight.id}>{flight.id}</li>
						))}
					</ul>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Home
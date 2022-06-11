import FlightIcon from '@mui/icons-material/Flight'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { Autocomplete, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers"
import { useAppDispatch } from 'app/hooks'
import { actions, selectors } from 'modules/Home/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { City } from 'types/interfaces'

const FlightSearch = () => {
	const dispatch = useAppDispatch()
	
	const cities = useSelector(selectors.getCities)
	
	const [cityFrom, setCityFrom] = useState<City | null>(null)
	const [cityTo, setCityTo] = useState<City | null>(null)
	const [date, setDate] = useState<Date | null>(null)
	const [time, setTime] = useState<Date | null>(null)
	
	const handleFindClick = () => {
		if(!date || !time) return
		dispatch(actions.getFlightsByCity({
			date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
			cityFrom: cityFrom?.name,
			cityTo: cityTo?.name
		}))
	}
	
	return (
		<>
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
					inputFormat="dd.MM.yyyy"
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
		</>
	)
}

export default FlightSearch
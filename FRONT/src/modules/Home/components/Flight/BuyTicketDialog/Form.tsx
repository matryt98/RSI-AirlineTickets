import { Box, FormLabel, TextField } from "@mui/material"
import NumberFormat from "react-number-format"
import { BuyTicketFormValues, Flight } from "types/interfaces"

interface FormProps {
	flight: Flight
	values: BuyTicketFormValues
	setValues: (values: BuyTicketFormValues) => void
}

const Form = (props: FormProps) => {
	const { flight, values, setValues } = props

	return (
		<>
			<TextField
				margin="dense"
				variant="standard"
				fullWidth
				autoFocus
				label="Name"
				value={values.name}
				onChange={(event) => setValues({...values, name: event.target.value})}
			/>
			<TextField
				margin="dense"
				variant="standard"
				fullWidth
				label="Surname"
				value={values.surname}
				onChange={(event) => setValues({...values, surname: event.target.value})}
			/>
			<TextField
				margin="dense"
				variant="standard"
				fullWidth
				label="Email"
				type="email"
				value={values.email}
				onChange={(event) => setValues({...values, email: event.target.value})}
			/>
			<TextField
				margin="dense"
				variant="standard"
				fullWidth
				label="Number Of Tickets"
				type="number"
				inputProps={{
					min: 1
				}}
				value={values.numberOfTickets}
				onChange={(event) => setValues({...values, numberOfTickets: Number(event.target.value) || 1})}
			/>
			<Box my={2}>
				<FormLabel>
					Price:{' '}
				</FormLabel>
				<NumberFormat
					displayType="text"
					thousandSeparator=" "
					suffix=" PLN"
					value={flight.price * values.numberOfTickets}
				/>
			</Box>
		</>
	)
}

export default Form
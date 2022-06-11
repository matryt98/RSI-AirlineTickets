import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { saveFileFromResponse } from "app/helpers/response"
import { useAppDispatch } from "app/hooks"
import { actions, selectors } from "modules/Home/store"
import { useDisplaySuccess } from "modules/Shared/hooks"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BuyTicketFormValues, Flight } from "types/interfaces"
import Form from "./Form"

const initialFormValues: BuyTicketFormValues = {
	name: '',
	surname: '',
	email: '',
	numberOfTickets: 1,
}

const BuyTicketDialog = () => {
	const dispatch = useAppDispatch()
	const displaySuccess = useDisplaySuccess()

	const isOpen = useSelector(selectors.isBuyTicketDialogOpen)
	const flightId = useSelector(selectors.selectedFlightId)
	const authInfo = useSelector(selectors.getAuthInfo)

	const [flight, setFlight] = useState<Flight | null>(null)
	const [values, setValues] = useState(initialFormValues)

	useEffect(() => {
		setValues(initialFormValues)
	}, [flight])

	useEffect(() => {
		if(!isOpen) return
		dispatch(actions.getFlight(flightId))
		.unwrap()
		.then(data => setFlight(data))
	}, [isOpen])
	
	const handleClose = () => {
		dispatch(actions.closeBuyTicketDialog())
	}

	const handleSubmit = () => {
		if(authInfo)
		dispatch(actions.makeReservation({
			reservation: {
				name: values.name,
				surname: values.surname,
				email: values.email,
				tickets: values.numberOfTickets,
				flightId: flightId,
				id: 0,
			},
			authInfo: authInfo
		}))
		.unwrap()
		.then((response) => {
			displaySuccess("Reservation made successfully")
			saveFileFromResponse(response)
		})
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>Make Reservation</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Fill form below to make reservation
				</DialogContentText>
				{flight && (
					<Form
						flight={flight}
						values={values}
						setValues={setValues}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					fullWidth
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					fullWidth
					color="secondary"
					variant="contained"
					onClick={handleSubmit}
				>
					Book
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BuyTicketDialog
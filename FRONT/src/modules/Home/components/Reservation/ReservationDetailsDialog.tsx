import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material"
import { saveFileFromResponse } from "app/helpers/response"
import { useAppDispatch } from "app/hooks"
import { actions, selectors } from "modules/Home/store"
import { useSelector } from "react-redux"

const ReservationDetailsDialog = () => {
	const dispatch = useAppDispatch()

	const isOpen = useSelector(selectors.isReservationDetailsDialogOpen)
	const reservation = useSelector(selectors.reservation)

	const handleClose = () => {
		dispatch(actions.closeReservationDetailsDialog())
	}

	const handlePdfDownload = () => {
		if(reservation)
		dispatch(actions.generatePdf(reservation.id))
		.unwrap()
		.then((response) => saveFileFromResponse(response))
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>Reservation details</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Here is some info about your reservation
				</DialogContentText>
				<Stack direction="row">
					<Box fontWeight="bold" mr={1}>Email:</Box>
					<Typography>{reservation?.email}</Typography>
				</Stack>
				<Stack direction="row">
					<Box fontWeight="bold" mr={1}>Tickets:</Box>
					<Typography>{reservation?.tickets}</Typography>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					fullWidth
					onClick={handleClose}
				>
					Close
				</Button>
				<Button
					fullWidth
					color="secondary"
					variant="contained"
					onClick={handlePdfDownload}
				>
					Download PDF
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ReservationDetailsDialog
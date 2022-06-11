import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useAppDispatch } from "app/hooks"
import { actions, selectors } from "modules/Home/store"
import { useDisplaySuccess } from "modules/Shared/hooks"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AuthFormValues } from "types/interfaces"
import Form from "./Form"

const initialFormValues: AuthFormValues = {
	login: '',
	password: '',
}

const AuthDialog = () => {
	const dispatch = useAppDispatch()
	const displaySuccess = useDisplaySuccess()

	const isOpen = useSelector(selectors.isAuthDialogOpen)

	const [values, setValues] = useState(initialFormValues)
	
	const handleClose = () => {
		dispatch(actions.closeAuthDialog())
	}

	useEffect(() => {
		setValues(initialFormValues)
	}, [isOpen])

	const handleSubmit = () => {
		dispatch(actions.authenticate({
			login: values.login,
			password: values.password,
		}))
		.unwrap()
		.then(() => {
			displaySuccess("Authenticated successfully")
			dispatch(actions.openBuyTicketDialog({
				login: values.login,
				password: values.password,
			}))
		})
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			fullWidth
			maxWidth="xs"
		>
			<DialogTitle>Authenticate</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Fill form to authenticate
				</DialogContentText>
				<Form
					values={values}
					setValues={setValues}
				/>
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
					Authenticate
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AuthDialog
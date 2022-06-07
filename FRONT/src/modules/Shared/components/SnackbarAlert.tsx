import { Alert, Snackbar } from "@mui/material"
import { actions, selectors } from "modules/Shared/store"
import { useDispatch, useSelector } from "react-redux"

const SnackbarAlert = () => {
	const dispatch = useDispatch()
  const isOpen = useSelector(selectors.isAlertOpen)
  const message = useSelector(selectors.getAlertMessage)
  const type = useSelector(selectors.getAlertType)

  const handleClose = () => {
    dispatch(actions.closeAlert())
  }
	
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={isOpen}
			autoHideDuration={5000}
			onClose={handleClose}
		>
			<Alert 
				variant="filled"
				severity={type} 
				onClose={handleClose}
			>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default SnackbarAlert
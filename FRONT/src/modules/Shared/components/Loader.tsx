import { Backdrop, CircularProgress } from "@mui/material"
import { selectors } from "modules/Shared/store"
import { useSelector } from "react-redux"

const Loader = () => {
	const isLoading = useSelector(selectors.isLoading)

	return (
		<Backdrop open={isLoading}>
			<CircularProgress size={100} />
		</Backdrop>
	)
}

export default Loader
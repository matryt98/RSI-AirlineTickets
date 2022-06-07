import { actions } from "modules/Shared/store"
import { useDispatch } from "react-redux"

const useDisplayError = () => {
	const dispatch = useDispatch()

	return (message: string) => {
		dispatch(actions.openAlert({
			type: 'error',
			message,
		}))
	}
}

export default useDisplayError
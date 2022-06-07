import { actions } from "modules/Shared/store"
import { useDispatch } from "react-redux"

const useDisplaySuccess = () => {
	const dispatch = useDispatch()

	return (message: string) => {
		dispatch(actions.openAlert({
			type: 'success',
			message,
		}))
	}
}

export default useDisplaySuccess
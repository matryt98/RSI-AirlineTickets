import { Button } from "@mui/material"
import { actions } from "modules/Shared/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Home = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(actions.showLoader())
		setTimeout(() => dispatch(actions.hideLoader()), 3000)
	}, [])

	return (
		<div style={{ textAlign: 'center'}}>
			<Button size="large" variant="contained">PRZYCISK</Button>
			<Button size="large" variant="contained" color="secondary">PRZYCISK</Button>
		</div>
	)
}

export default Home
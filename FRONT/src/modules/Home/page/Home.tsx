import { Button } from "@mui/material"
import { useAppDispatch } from "app/hooks"
import { actions, selectors } from "modules/Home/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const Home = () => {
	const dispatch = useAppDispatch()
	const cities = useSelector(selectors.getCities)

	useEffect(() => {
		dispatch(actions.getCities())
	}, [])

	return (
		<div style={{ textAlign: 'center'}}>
			<Button size="large" variant="contained">PRZYCISK</Button>
			<Button size="large" variant="contained" color="secondary">PRZYCISK</Button>
			<ul>
				{cities.map(city => (
					<li key={city.id}>{city.name}</li>
				))}
			</ul>
		</div>
	)
}

export default Home
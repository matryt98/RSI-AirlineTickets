import { Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Message } from "types/interfaces"
import Messages from "../components/Messages"
import { actions, selectors } from "../store"

const Home = () => {
	const dispatch = useAppDispatch()
	const messagesFromStore = useAppSelector(state => state.home.messages)
	const messagesFromStore2 = useSelector(selectors.getMessages)

	const [messagesFetched, setMessagesFetched] = useState('NIE')
	const [messagesFromState, setMessages] = useState<Message[]>([])
	
	useEffect(() => {
		// setTimeout(fetchMessages, 5000)
		fetchMessages()
	}, [])

	const fetchMessages = async () => {
		dispatch(actions.getMessages())
			.unwrap()
			.then((data) => {
				setMessages(data)
				setMessagesFetched("TAK")
			})
			.catch(err => console.error(err))
	}

	const handleReset = () => {
		dispatch(actions.resetMessages())
	}

	const handleFetch = () => {
		fetchMessages()
	}

	return (
		<div style={{ textAlign: 'center'}}>
			<h1>Home</h1>
			<h3>Messages fetched: {messagesFetched}</h3>
			<Button variant="contained" onClick={handleReset}>Reset</Button>
			<Button color="secondary" variant="contained" onClick={handleFetch}>Pobierz</Button>
			<h6>Message from store</h6>
			<Messages messages={messagesFromStore}/>
			<h6>Message from store 2</h6>
			<Messages messages={messagesFromStore2}/>
			<h6>Message from state</h6>
			<Messages messages={messagesFromState}/>
		</div>
	)
}

export default Home
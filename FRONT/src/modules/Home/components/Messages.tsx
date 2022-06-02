import { Message } from "types/interfaces"
import MessageComponent from "./Message"

interface MessagesProps {
	messages: Message[]
}

const Messages = (props: MessagesProps) => {

	return (
		<ul>
			{props.messages.map((message, index) => (
				<MessageComponent key={index} message={message}/>
			))}
		</ul>
	)
}

export default Messages
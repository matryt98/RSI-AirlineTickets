import { Message } from "types/interfaces"

interface MessageComponentProps {
	message: Message
}

const MessageComponent = (props: MessageComponentProps) => {

	return (
		<li>{props.message.text}</li>
	)
}

export default MessageComponent
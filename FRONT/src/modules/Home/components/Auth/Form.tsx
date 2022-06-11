import { TextField } from "@mui/material"
import { AuthFormValues } from "types/interfaces"

interface FormProps {
	values: AuthFormValues
	setValues: (values: AuthFormValues) => void
}

const Form = (props: FormProps) => {
	const { values, setValues } = props

	return (
		<>
			<TextField
				margin="dense"
				variant="standard"
				fullWidth
				autoFocus
				label="Login"
				value={values.login}
				onChange={(event) => setValues({...values, login: event.target.value})}
			/>
			<TextField
				margin="dense"
				variant="standard"
				fullWidth
				label="Password"
				type="password"
				value={values.password}
				onChange={(event) => setValues({...values, password: event.target.value})}
			/>
		</>
	)
}

export default Form
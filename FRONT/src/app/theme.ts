import { createTheme } from "@mui/material"
import { lightBlue } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[900],
    },
    secondary: {
      main: lightBlue[600],
    },
  },
})

export default theme
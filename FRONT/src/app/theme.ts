import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[200],
    },
  },
})

export default theme
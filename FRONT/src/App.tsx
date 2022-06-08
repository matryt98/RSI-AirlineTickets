import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import routes from "app/routes"
import { store } from "app/store"
import theme from "app/theme"
import { Loader, SnackbarAlert } from "modules/Shared/components"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const App = () => {
	return (
		<Provider store={store}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<Loader />
						<SnackbarAlert />
						<Routes>
							{routes.map((route, index) => 
								<Route key={index} {...route} />
							)}
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</LocalizationProvider>
		</Provider>
	)
}

export default App

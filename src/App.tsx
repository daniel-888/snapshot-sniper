import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { darkTheme } from './theme/theme';
import NFTCollectionProvider from './pages/NFTCollectionProvider';
import WalletConnectProvider from './components/WalletConnectProvider'
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';
import Home from './pages/Home';
import LiveListing from './pages/LiveListing';
import Activity from './pages/Activity';

function App() {

	// const themeMode = useAppSelector((state) => (state.theme.themeMode))
	// let [theme, setTheme] = useState(darkTheme)
	const theme = darkTheme

	// useEffect(() => {
	// 	if (themeMode === 'dark') {
	// 		setTheme(darkTheme)
	// 		localStorage.setItem('snapshot-theme', 'dark')
	// 	}
	// 	else {
	// 		setTheme(lightTheme)
	// 		localStorage.setItem('snapshot-theme', 'light')
	// 	}
	// }, [themeMode])

	return (
		<NFTCollectionProvider>
			<WalletConnectProvider>
				<ThemeProvider theme={theme}>
					<Router>
						<Switch>
							<Redirect exact from="/" to="/home" />
							<PublicRoute exact path="/home" component={Home} title="Home" />
							<PrivateRoute exact path="/live" component={LiveListing} title="Live Listing" />
							<PrivateRoute exact path="/activity" component={Activity} title="Activities" />
							<PrivateRoute path="/*" component={() => <div style={{ padding: 30 }}><h2> Page Not Found </h2></div>} />
							<PublicRoute path="/*" component={() => <div style={{ padding: 30 }}><h2> Page Not Found </h2></div>} />
						</Switch>
					</Router>
				</ThemeProvider>
			</WalletConnectProvider>
		</NFTCollectionProvider>
	);
}

export default App;
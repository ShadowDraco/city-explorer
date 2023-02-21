import './App.css'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

function App() {
	const ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
	let searchString = 'seattle'

	let requestLocation = async () => {
		axios
			.get(
				`https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN}&q=${searchString}&format=json`
			)
			.then(res => {
				console.log(res.data)
			})
	}

	return (
		<div className='App'>
			<Button onClick={requestLocation}>Click me</Button>
		</div>
	)
}

export default App

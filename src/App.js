import './App.css'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

function App() {
	let LOCATION_ACCESS_TOKEN = process.env.LOCATION_ACCESS_TOKEN
	let searchString = 'seattle'
	console.log(process.env.LOCATION_ACCESS_TOKEN)

	let requestLocation = async () => {
		axios
			.get(
				`https://us1.locationiq.com/v1/search?key=${LOCATION_ACCESS_TOKEN}&q=${searchString}&format=json`
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

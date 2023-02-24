import React from 'react'

import WeatherDay from './WeatherDay'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default class Weather extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='forecast-container border-2 border-top border-dark p-5'>
				<h4>Weather forecasts: </h4>
				<Row>
					{this.props.forecasts.map(forecast => {
						return <WeatherDay forecast={forecast} />
					})}
				</Row>
			</Container>
		)
	}
}

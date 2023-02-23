import React from 'react'
import Col from 'react-bootstrap/Col'
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
						return (
							<Col
								key={forecast.date}
								className='forecast flex-column border-2 border-end border-dark'
							>
								<h5>{forecast.description}</h5>
								<h6 className='mt-3'>{forecast.dateDay}</h6>
								<p>{forecast.date}</p>
							</Col>
						)
					})}
				</Row>
			</Container>
		)
	}
}

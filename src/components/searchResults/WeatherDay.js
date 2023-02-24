import React from 'react'

import Col from 'react-bootstrap/Col'

export default class WeatherDay extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Col
				key={this.props.forecast.date}
				className='forecast flex-column border-2 border-end border-dark'
			>
				<h5>{this.props.forecast.description}</h5>
				<h6 className='mt-3'>{this.props.forecast.dateDay}</h6>
				<p>{this.props.forecast.date}</p>
			</Col>
		)
	}
}

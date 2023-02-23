import React from 'react'
import Container from 'react-bootstrap/Container'
export default class Result extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container
				className='result-info'
				onClick={() => this.props.setMapLocation(this.props.result, this.props.index)}
			>
				<h5>{this.props.result.display_name}</h5>
				<Container className='long-lat'>
					<p>{this.props.result.lon}</p>
					<p>{this.props.result.lat}</p>
				</Container>
			</Container>
		)
	}
}

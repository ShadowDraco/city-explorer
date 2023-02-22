import React from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default class MapButtons extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='mt-3 mb-3'>
				<Button onClick={() => this.props.increaseZoom()}>Zoom +</Button>
				<Button onClick={() => this.props.decreaseZoom()}>Zoom - </Button>
			</Container>
		)
	}
}

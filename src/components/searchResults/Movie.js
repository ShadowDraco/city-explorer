import React from 'react'

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

export default class Movie extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='movie'>
				<Image src={this.props.movie.image_url} alt={this.props.movie.title} />
				<p>{this.props.movie.overview}</p>
			</Container>
		)
	}
}

import React from 'react'
import { Image } from 'react-bootstrap'

import Container from 'react-bootstrap/Container'

export default class Movies extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props)
	}

	render() {
		return (
			<Container className='movie-container'>
				{this.props.movies.map(movie => {
					return (
						<Container className='movie'>
							<h4>{movie.original_title}</h4>
							<Image src={movie.image_url} alt={movie.title} />
							<p>{movie.overview}</p>
						</Container>
					)
				})}
			</Container>
		)
	}
}

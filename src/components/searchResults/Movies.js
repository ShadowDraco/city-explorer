import React from 'react'

import MinorError from '../MinorError'

import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

export default class Movies extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<>
				<h4 className='mt-5'> Movies in the area:</h4>
				<Container className='movie-container mt-3'>
					{this.props.movies ? (
						this.props.movies.map(movie => {
							return (
								<Container key={movie.image_url} className='movie'>
									<Image src={movie.image_url} alt={movie.title} />
									<p>{movie.overview}</p>
								</Container>
							)
						})
					) : (
						<MinorError errorMessage='There are no movies to display right now' />
					)}
				</Container>
			</>
		)
	}
}
import React from 'react'

import MinorError from '../MinorError'

import Container from 'react-bootstrap/Container'
import Movie from './Movie'

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
					{this.props.movies.length > 0 ? (
						this.props.movies.map(movie => {
							return <Movie key={movie.image_url} movie={movie} />
						})
					) : (
						<MinorError errorMessage='There are no movies for the area' />
					)}
				</Container>
			</>
		)
	}
}

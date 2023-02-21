import React from 'react'
import Container from 'react-bootstrap/Container'

class SearchResults extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<>
				<Container className='search-results'>
					{this.props.results
						? this.props.results.map(result => {
								return (
									<Container
										className='result-container bg-light text-dark'
										key={result.display_name}
									>
										<h5>{result.display_name}</h5>
										<Container className='long-lat'>
											<p>{result.lon}</p>
											<p>{result.lat}</p>
										</Container>
									</Container>
								)
						  })
						: ''}
				</Container>
			</>
		)
	}
}

export default SearchResults

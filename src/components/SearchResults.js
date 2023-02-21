import React from 'react'

import Map from './Map'

import Container from 'react-bootstrap/Container'

class SearchResults extends React.Component {
	constructor(props) {
		super(props)

		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.state = { mapLocation: '', mapImage: '', zoom: 15 }
	}

	setMapLocation = (result, index) => {
		this.setState({ mapLocation: result })
		this.setState({ mapIndex: index })
		this.setState({
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${result.lat},${result.lon}&zoom=${this.state.zoom}`,
		})
	}

	render() {
		return (
			<>
				<Container className='search-results'>
					{this.props.results
						? this.props.results.map((result, i) => {
								return (
									<Container
										onClick={() => this.setMapLocation(result, i)}
										className='result-container'
										key={result.display_name}
									>
										<Container className='result-info'>
											<h5>{result.display_name}</h5>
											<Container className='long-lat'>
												<p>{result.lon}</p>
												<p>{result.lat}</p>
											</Container>
										</Container>

										{this.state.mapImage ? (
											i === this.state.mapIndex ? (
												<Map mapImage={this.state.mapImage} />
											) : (
												''
											)
										) : (
											''
										)}
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

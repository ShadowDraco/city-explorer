import React from 'react'
import axios from 'axios'

import Map from './Map'

import Container from 'react-bootstrap/Container'

class SearchResults extends React.Component {
	constructor(props) {
		super(props)

		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.state = { mapLocation: '', mapImage: '', zoom: 10 }
	}

	setMapLocation = result => {
		this.setState({ mapLocation: result })
		this.setState({
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${result.lat},${result.lon}&zoom=${this.state.zoom}`,
		})
	}

	render() {
		return (
			<>
				<Container className='search-results'>
					{this.state.mapImage ? <Map mapImage={this.state.mapImage} /> : ''}

					{this.props.results
						? this.props.results.map(result => {
								return (
									<Container
										onClick={() => this.setMapLocation(result)}
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

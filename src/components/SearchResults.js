import React from 'react'
import axios from 'axios'

import Map from './Map'
import MapButtons from './MapButtons'
import Error from './Error'
import MinorError from './MinorError'
import Weather from './Weather'

import Container from 'react-bootstrap/Container'
class SearchResults extends React.Component {
	constructor(props) {
		super(props)

		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.state = { mapLocation: '', mapImage: '', zoom: 15 }
	}

	setMapLocation = async (result, index) => {
		this.setState({ mapLocation: result })
		this.setState({ mapIndex: index })
		this.setState({
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${result.lat},${result.lon}&zoom=${this.state.zoom}&size=350x350&markers=icon:large-red-cutout|${result.lat},${result.lon}`,
		})

		await this.getWeatherFor(result)
	}

	getWeatherFor = async result => {
		axios
			.post('http://localhost:8000/weather', {
				lat: result.lat,
				lon: result.lon,
				searchQuery: result.display_name.split(',')[0],
			})
			.then(res => {
				this.setState({ forecasts: res.data, error: '' })
			})
			.catch(err => {
				console.log(err)
				this.setState({
					error: err.response.data,
					forecasts: '',
				})
			})
	}

	increaseZoom = () => {
		this.state.zoom < 18
			? this.setState({ zoom: this.state.zoom + 1, minorError: '' })
			: this.setState({ minorError: 'you cannot zoom further' })
	}
	decreaseZoom = () => {
		this.state.zoom > 0
			? this.setState({ zoom: this.state.zoom - 1, minorError: '' })
			: this.setState({ minorError: 'you cannot zoom further' })
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
										{/* Display the map for only the selected location */}
										{this.state.mapImage ? (
											i === this.state.mapIndex ? (
												<>
													<Map mapImage={this.state.mapImage} />
													<MapButtons
														increaseZoom={this.increaseZoom}
														decreaseZoom={this.decreaseZoom}
													/>
													{this.state.minorError ? (
														<MinorError errorMessage={this.state.minorError} />
													) : (
														''
													)}
												</>
											) : (
												''
											)
										) : (
											''
										)}

										{/* Display the forecasts for only the selected location */}
										{this.state.forecasts ? (
											i === this.state.mapIndex ? (
												<Weather forecasts={this.state.forecasts} />
											) : (
												''
											)
										) : i === this.state.mapIndex ? (
											<Error errorMessage={this.state.error} />
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

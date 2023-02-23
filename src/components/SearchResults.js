import React from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import LocationInfo from './LocationInfo'
class SearchResults extends React.Component {
	constructor(props) {
		super(props)

		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.state = { mapLocation: '', mapImage: '', zoom: 15, weatherInfo: '' }
	}

	setMapLocation = async (result, index) => {
		this.setState({
			lat: result.lat,
			lon: result.lon,
			mapLocation: result,
			mapIndex: index,
			mapName: result.display_name,
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${result.lat},${result.lon}&zoom=${this.state.zoom}&size=350x350&markers=icon:large-red-cutout|${result.lat},${result.lon}`,
		})

		await this.getWeatherFor(result)
		await this.getMovieFor(result.display_name)
	}

	getMovieFor = async name => {
		axios
			.post('https://frolic-through-city-api.onrender.com/movies', {
				searchQuery: name,
			})
			.then(res => {
				this.setState({ movies: res.data, error: '' })
			})
			.catch(err => {
				console.log(err)
				this.setState({ error: err.response.data, movies: '' })
			})
	}

	getWeatherFor = async result => {
		// request weather at api
		axios
			.post('https://frolic-through-city-api.onrender.com/weather', {
				lat: result.lat,
				lon: result.lon,
				searchQuery: result.display_name.split(',')[0],
			})
			.then(res => {
				// set state resulting forecasts
				this.setState({ forecasts: res.data, error: '' })
			})
			.catch(err => {
				// catch error and set error state
				console.log(err)
				this.setState({
					error: err.response.data,
					forecasts: '',
				})
			})
	}

	updateMapImage = () => {
		this.setState({
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}&size=350x350&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}`,
		})
	}

	increaseZoom = () => {
		console.log('increasing')
		this.state.zoom < 18
			? this.setState({ zoom: this.state.zoom + 1, minorError: '' }, () => {
					this.updateMapImage()
			  })
			: this.setState({ minorError: 'you cannot zoom further' })
	}
	decreaseZoom = () => {
		this.state.zoom > 0
			? this.setState({ zoom: this.state.zoom - 1, minorError: '' }, () => {
					this.updateMapImage()
			  })
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
										className='result-container'
										key={result.display_name}
									>
										{/* Return selectable location 'cards' */}
										<Container
											className='result-info'
											onClick={() => this.setMapLocation(result, i)}
										>
											<h5>{result.display_name}</h5>
											<Container className='long-lat'>
												<p>{result.lon}</p>
												<p>{result.lat}</p>
											</Container>
										</Container>

										{/* Display the map, weather and movies for only the selected location */}
										{/* pass errors from parent and try to display in correct location */}
										{this.state.mapIndex === i ? (
											<LocationInfo
												mapInfo={{
													mapImage: this.state.mapImage,
													increaseZoom: this.increaseZoom,
													decreaseZoom: this.decreaseZoom,
												}}
												weatherInfo={this.state.forecasts}
												movieInfo={{ movies: this.state.movies }}
												error={this.state.error}
												minorError={this.state.minorError}
											/>
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

import React from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import LocationInfo from './searchResults/LocationInfo'
import Result from './searchResults/Result'
class SearchResults extends React.Component {
	constructor(props) {
		super(props)

		this.ACCESS_TOKEN = process.env.REACT_APP_LOCATION_ACCESS_TOKEN
		this.API_URL = process.env.REACT_APP_API_URL
		this.state = { mapLocation: '', mapImage: '', zoom: 15, weatherInfo: '' }
	}

	// when user selects a location after searching update state to include information to be displayed by various components
	setMapLocation = async (result, index) => {
		console.log(result)
		this.setState({
			lat: result.lat,
			lon: result.lon,
			mapLocation: result,
			mapIndex: index,
			mapName: result.display_name,
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${result.lat},${result.lon}&zoom=${this.state.zoom}&size=350x350&markers=icon:large-red-cutout|${result.lat},${result.lon}`,
		})

		await this.getWeatherFor(result)
		await this.getMovieFor(result.display_name.split(',')[0])
	}

	// get movies for a 'resulting' location
	getMovieFor = async name => {
		axios
			.post(`${this.API_URL}/movies`, {
				searchQuery: name,
			})
			.then(res => {
				console.log(res)
				// update movies with success
				this.setState({ movies: res.data, error: '' })
			})
			.catch(err => {
				// add error message to display when failing
				console.log(err)
				this.setState({ error: err.response.data, movies: '' })
			})
	}

	// get weather for a 'resulting' location
	getWeatherFor = async result => {
		// request weather at api
		axios
			.post(`${this.API_URL}/weather`, {
				lat: result.lat,
				lon: result.lon,
				searchQuery: result.display_name.split(',')[0],
			})
			.then(res => {
				console.log(res.data)
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

	// update state for the image so it can be rerendered properly and quickly
	updateMapImage = () => {
		this.setState({
			mapImage: `https://maps.locationiq.com/v3/staticmap?key=${this.ACCESS_TOKEN}&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}&size=350x350&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}`,
		})
	}

	// Increase or decrease state for mapImage zoom.
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
										<Result
											result={result}
											index={i}
											setMapLocation={this.setMapLocation}
										/>

										{/* Display the map, weather and movies for only the -selected- location */}
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

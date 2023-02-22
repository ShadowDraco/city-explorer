import React from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import LocationInfo from './LocationInfo'
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
		// request weather at api
		axios
			.post('http://localhost:8000/weather', {
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
										{/* Return selectable location 'cards' */}
										<Container className='result-info'>
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

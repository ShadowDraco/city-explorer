import React from 'react'

import Map from './searchResults/Map'
import MapButtons from './searchResults/MapButtons'
import Weather from './searchResults/Weather'
import Movies from './searchResults/Movies'

import Error from './Error'
import MinorError from './MinorError'

import Container from 'react-bootstrap/Container'

export default class LocationInfo extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container>
				{this.props.mapInfo.mapImage ? (
					<>
						<Map mapImage={this.props.mapInfo.mapImage} />
						<MapButtons
							increaseZoom={this.props.mapInfo.increaseZoom}
							decreaseZoom={this.props.mapInfo.decreaseZoom}
						/>
					</>
				) : (
					<MinorError errorMessage={this.props.minorError} />
				)}

				{this.props.weatherInfo ? (
					<Weather forecasts={this.props.weatherInfo} />
				) : (
					<Error errorMessage={this.props.error} />
				)}

				{this.props.movieInfo.movies ? (
					<Movies movies={this.props.movieInfo.movies} />
				) : (
					<Error errorMessage={this.props.error} />
				)}
			</Container>
		)
	}
}

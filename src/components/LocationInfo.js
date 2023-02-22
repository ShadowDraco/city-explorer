import React from 'react'

import Map from './searchResults/Map'
import Weather from './searchResults/Weather'
import Movies from './searchResults/Movies'

import Container from 'react-bootstrap/Container'

export default class LocationInfo extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container>
				<Map />
				<Weather />
				<Movies />
			</Container>
		)
	}
}

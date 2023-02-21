import React from 'react'
import { Image } from 'react-bootstrap/esm'

class Map extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Image src={this.props.mapImage} alt='map image of chosen location' />
		)
	}
}

export default Map
